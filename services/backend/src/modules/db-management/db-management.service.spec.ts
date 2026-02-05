import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { DbManagementService } from './db-management.service';
import { User, Tomite } from '../../entities';

describe('DbManagementService', () => {
  let service: DbManagementService;
  let dataSource: jest.Mocked<DataSource>;
  let configService: jest.Mocked<ConfigService>;
  let queryRunner: jest.Mocked<QueryRunner>;
  let mockTomiteRepository: jest.Mocked<Repository<Tomite>>;
  let mockUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    mockTomiteRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Tomite>>;

    mockUserRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        getRepository: jest.fn((entity) => {
          if (entity === Tomite) return mockTomiteRepository;
          if (entity === User) return mockUserRepository;
          return {};
        }),
      },
    } as unknown as jest.Mocked<QueryRunner>;

    dataSource = {
      showMigrations: jest.fn(),
      runMigrations: jest.fn(),
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
      getRepository: jest.fn((entity) => {
        if (entity === Tomite) return mockTomiteRepository;
        if (entity === User) return mockUserRepository;
        return {};
      }),
    } as unknown as jest.Mocked<DataSource>;

    configService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbManagementService,
        { provide: DataSource, useValue: dataSource },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<DbManagementService>(DbManagementService);
  });

  describe('runMigrations', () => {
    it('should return success with empty list when no pending migrations', async () => {
      dataSource.showMigrations.mockResolvedValue(false);

      const result = await service.runMigrations();

      expect(result.success).toBe(true);
      expect(result.operation).toBe('migrate');
      expect(result.details.executed).toEqual([]);
      expect(result.details.summary).toEqual({ pending: 0, executed: 0 });
    });

    it('should execute pending migrations and return their names', async () => {
      dataSource.showMigrations.mockResolvedValue(true);
      dataSource.runMigrations.mockResolvedValue([
        { name: 'Migration1' } as any,
        { name: 'Migration2' } as any,
      ]);

      const result = await service.runMigrations();

      expect(result.success).toBe(true);
      expect(result.details.executed).toEqual(['Migration1', 'Migration2']);
      expect(result.details.summary).toEqual({ executed: 2 });
    });

    it('should handle migration errors gracefully', async () => {
      dataSource.showMigrations.mockResolvedValue(true);
      dataSource.runMigrations.mockRejectedValue(new Error('Migration failed'));

      const result = await service.runMigrations();

      expect(result.success).toBe(false);
      expect(result.details.errors).toContain('Migration failed');
    });
  });

  describe('runSeeds', () => {
    beforeEach(() => {
      configService.get.mockReturnValue('');
    });

    it('should create Bureau tomite if it does not exist', async () => {
      mockTomiteRepository.findOne.mockResolvedValue(null);
      mockTomiteRepository.create.mockReturnValue({ code: 'BUR' } as Tomite);
      mockTomiteRepository.save.mockResolvedValue({ code: 'BUR' } as Tomite);

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.executed).toContain('tomites:Bureau');
      expect(result.details.summary?.tomites_created).toBe(1);
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });

    it('should skip Bureau tomite if it already exists', async () => {
      mockTomiteRepository.findOne.mockResolvedValue({ code: 'BUR' } as Tomite);

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.skipped).toContain('tomites:Bureau');
      expect(result.details.summary?.tomites_skipped).toBe(1);
    });

    it('should rollback transaction on error', async () => {
      mockTomiteRepository.findOne.mockRejectedValue(new Error('DB Error'));

      const result = await service.runSeeds();

      expect(result.success).toBe(false);
      expect(result.details.errors).toContain('DB Error');
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it('should create board users from BOARD_USERS config', async () => {
      configService.get.mockReturnValue('admin@test.com:password123');
      mockTomiteRepository.findOne.mockResolvedValue({
        id: 'bureau-id',
        code: 'BUR',
      } as Tomite);
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({} as User);
      mockUserRepository.save.mockResolvedValue({} as User);

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.executed).toContain('board-user:admin@test.com');
      expect(result.details.summary?.users_created).toBe(1);
    });

    it('should skip existing board users', async () => {
      configService.get.mockReturnValue('existing@test.com:password123');
      mockTomiteRepository.findOne.mockResolvedValue({
        id: 'bureau-id',
        code: 'BUR',
      } as Tomite);
      mockUserRepository.findOne.mockResolvedValue({
        email: 'existing@test.com',
      } as User);

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.skipped).toContain('board-user:existing@test.com');
      expect(result.details.summary?.users_skipped).toBe(1);
    });
  });

  describe('parseBoardUsers (via runSeeds)', () => {
    beforeEach(() => {
      mockTomiteRepository.findOne.mockResolvedValue({
        id: 'bureau-id',
        code: 'BUR',
      } as Tomite);
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({} as User);
      mockUserRepository.save.mockResolvedValue({} as User);
    });

    it('should validate email format with Zod', async () => {
      configService.get.mockReturnValue('invalid-email:password123');

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.summary?.users_created).toBe(0);
    });

    it('should reject passwords shorter than 8 characters', async () => {
      configService.get.mockReturnValue('test@test.com:short');

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.summary?.users_created).toBe(0);
    });

    it('should skip duplicate emails', async () => {
      configService.get.mockReturnValue(
        'test@test.com:password123,test@test.com:password456',
      );

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.summary?.users_created).toBe(1);
    });

    it('should handle multiple valid users', async () => {
      configService.get.mockReturnValue(
        'user1@test.com:password123,user2@test.com:password456',
      );

      const result = await service.runSeeds();

      expect(result.success).toBe(true);
      expect(result.details.summary?.users_created).toBe(2);
    });
  });
});
