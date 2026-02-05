import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import { DbManagementController } from './db-management.controller';
import { DbManagementService } from './db-management.service';
import { DbManagementEnabledGuard } from './guards/db-management-enabled.guard';

describe('DbManagementController', () => {
  let controller: DbManagementController;
  let service: jest.Mocked<DbManagementService>;

  beforeEach(async () => {
    service = {
      runMigrations: jest.fn(),
      runSeeds: jest.fn(),
    } as unknown as jest.Mocked<DbManagementService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbManagementController],
      providers: [
        { provide: DbManagementService, useValue: service },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue(true) },
        },
      ],
    })
      .overrideGuard(DbManagementEnabledGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DbManagementController>(DbManagementController);
  });

  describe('migrate', () => {
    it('should call service.runMigrations and return result', async () => {
      const expectedResult = {
        success: true,
        operation: 'migrate' as const,
        details: { executed: ['Migration1'] },
        timestamp: '2026-02-05T00:00:00.000Z',
      };
      service.runMigrations.mockResolvedValue(expectedResult);

      const result = await controller.migrate();

      expect(service.runMigrations).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('seed', () => {
    it('should call service.runSeeds and return result', async () => {
      const expectedResult = {
        success: true,
        operation: 'seed' as const,
        details: { executed: ['tomites:Bureau'], skipped: [] },
        timestamp: '2026-02-05T00:00:00.000Z',
      };
      service.runSeeds.mockResolvedValue(expectedResult);

      const result = await controller.seed();

      expect(service.runSeeds).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});

describe('DbManagementEnabledGuard', () => {
  let guard: DbManagementEnabledGuard;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    configService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    guard = new DbManagementEnabledGuard(configService);
  });

  it('should allow access when DB_MANAGEMENT_ENABLED is true', () => {
    configService.get.mockReturnValue(true);

    const result = guard.canActivate({} as any);

    expect(result).toBe(true);
  });

  it('should throw ForbiddenException when DB_MANAGEMENT_ENABLED is false', () => {
    configService.get.mockReturnValue(false);

    expect(() => guard.canActivate({} as any)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when DB_MANAGEMENT_ENABLED is undefined', () => {
    configService.get.mockReturnValue(undefined);

    expect(() => guard.canActivate({} as any)).toThrow(ForbiddenException);
  });
});
