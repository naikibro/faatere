import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';
import { DbOperationResponseDto } from './dto/db-operation-response.dto';
import { UserRole } from '@shared/src/enums';
import { User, Tomite } from '../../entities';

const SALT_ROUNDS = 12;
const BUREAU_TOMITE_CODE = 'BUR';

const boardUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

interface BoardUser {
  email: string;
  password: string;
}

@Injectable()
export class DbManagementService {
  private readonly logger = new Logger(DbManagementService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async runMigrations(): Promise<DbOperationResponseDto> {
    this.logger.log('Starting migration execution...');

    const executed: string[] = [];
    const errors: string[] = [];

    try {
      const pendingMigrations = await this.dataSource.showMigrations();

      if (!pendingMigrations) {
        this.logger.log('No pending migrations to run');
        return {
          success: true,
          operation: 'migrate',
          details: {
            executed: [],
            summary: { pending: 0, executed: 0 },
          },
          timestamp: new Date().toISOString(),
        };
      }

      const migrations = await this.dataSource.runMigrations({
        transaction: 'each',
      });

      for (const migration of migrations) {
        executed.push(migration.name);
        this.logger.log(`Executed migration: ${migration.name}`);
      }

      return {
        success: true,
        operation: 'migrate',
        details: {
          executed,
          summary: { executed: executed.length },
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Migration failed: ${errorMessage}`);
      errors.push(errorMessage);

      return {
        success: false,
        operation: 'migrate',
        details: {
          executed,
          errors,
        },
        timestamp: new Date().toISOString(),
      };
    }
  }

  async runSeeds(): Promise<DbOperationResponseDto> {
    this.logger.log('Starting seed execution...');

    const executed: string[] = [];
    const skipped: string[] = [];
    const errors: string[] = [];
    const summary: Record<string, number> = {
      tomites_created: 0,
      tomites_skipped: 0,
      users_created: 0,
      users_skipped: 0,
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Seed Tomites first (Bureau tomite required for board users)
      this.logger.log('Seeding tomites...');
      const tomiteResult = await this.seedBureauTomite(queryRunner);
      if (tomiteResult.created) {
        executed.push('tomites:Bureau');
        summary.tomites_created = 1;
      } else {
        skipped.push('tomites:Bureau');
        summary.tomites_skipped = 1;
      }

      // Seed Board Users
      this.logger.log('Seeding board users...');
      const usersResult = await this.seedBoardUsers(queryRunner);
      summary.users_created = usersResult.created;
      summary.users_skipped = usersResult.skipped;

      for (const email of usersResult.createdEmails) {
        executed.push(`board-user:${email}`);
      }
      for (const email of usersResult.skippedEmails) {
        skipped.push(`board-user:${email}`);
      }

      await queryRunner.commitTransaction();
      this.logger.log('Seed transaction committed successfully');

      return {
        success: true,
        operation: 'seed',
        details: {
          executed,
          skipped,
          summary,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Seed failed, transaction rolled back: ${errorMessage}`);
      errors.push(errorMessage);

      return {
        success: false,
        operation: 'seed',
        details: {
          executed: [],
          skipped: [],
          errors,
          summary: {
            tomites_created: 0,
            tomites_skipped: 0,
            users_created: 0,
            users_skipped: 0,
          },
        },
        timestamp: new Date().toISOString(),
      };
    } finally {
      await queryRunner.release();
    }
  }

  private async seedBureauTomite(
    queryRunner: import('typeorm').QueryRunner,
  ): Promise<{ created: boolean }> {
    const tomiteRepository = queryRunner.manager.getRepository(Tomite);

    const existingBureau = await tomiteRepository.findOne({
      where: { code: BUREAU_TOMITE_CODE },
    });

    if (existingBureau) {
      this.logger.log('Bureau tomite already exists, skipping...');
      return { created: false };
    }

    const bureau = tomiteRepository.create({
      code: BUREAU_TOMITE_CODE,
      name: 'Bureau',
      description: 'Bureau du parti - Administration centrale',
    });

    await tomiteRepository.save(bureau);
    this.logger.log('Created Bureau tomite');
    return { created: true };
  }

  private async seedBoardUsers(
    queryRunner: import('typeorm').QueryRunner,
  ): Promise<{
    created: number;
    skipped: number;
    createdEmails: string[];
    skippedEmails: string[];
  }> {
    const userRepository = queryRunner.manager.getRepository(User);
    const tomiteRepository = queryRunner.manager.getRepository(Tomite);

    const result = {
      created: 0,
      skipped: 0,
      createdEmails: [] as string[],
      skippedEmails: [] as string[],
    };

    const boardUsersEnv = this.configService.get<string>('boardUsers');

    if (!boardUsersEnv) {
      this.logger.warn('BOARD_USERS not configured, skipping board user seed');
      return result;
    }

    const bureau = await tomiteRepository.findOne({
      where: { code: BUREAU_TOMITE_CODE },
    });

    if (!bureau) {
      throw new Error('Bureau tomite not found. Run tomites seed first.');
    }

    const boardUsers = this.parseBoardUsers(boardUsersEnv);

    for (const { email, password } of boardUsers) {
      const existingUser = await userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        this.logger.log(`User ${email} already exists, skipping...`);
        result.skipped++;
        result.skippedEmails.push(email);
        continue;
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = userRepository.create({
        email,
        passwordHash,
        role: UserRole.BOARD,
        isActive: true,
        tomiteId: bureau.id,
        memberId: null,
        invitedBy: null,
      });

      await userRepository.save(user);
      this.logger.log(`Created board user: ${email}`);
      result.created++;
      result.createdEmails.push(email);
    }

    return result;
  }

  private parseBoardUsers(boardUsersEnv: string): BoardUser[] {
    const users: BoardUser[] = [];
    const seenEmails = new Set<string>();

    const userEntries = boardUsersEnv.split(',').map((entry) => entry.trim());

    for (const entry of userEntries) {
      if (!entry) continue;

      const colonIndex = entry.indexOf(':');
      if (colonIndex === -1) {
        this.logger.warn(
          `Invalid BOARD_USERS format for entry "${entry}", skipping`,
        );
        continue;
      }

      const email = entry.substring(0, colonIndex).trim().toLowerCase();
      const password = entry.substring(colonIndex + 1).trim();

      // Validate with Zod
      const validation = boardUserSchema.safeParse({ email, password });
      if (!validation.success) {
        const errorMessages = validation.error.issues
          .map((e) => e.message)
          .join(', ');
        this.logger.warn(
          `Invalid entry for "${email}": ${errorMessages}, skipping`,
        );
        continue;
      }

      if (seenEmails.has(email)) {
        this.logger.warn(`Duplicate email "${email}", skipping`);
        continue;
      }
      seenEmails.add(email);

      users.push({ email, password });
    }

    return users;
  }
}
