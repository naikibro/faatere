import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DbManagementService } from './db-management.service';
import { DbOperationResponseDto } from './dto/db-operation-response.dto';
import { DbManagementEnabledGuard } from './guards/db-management-enabled.guard';

@ApiTags('Database Management')
@Controller('api/db')
@UseGuards(DbManagementEnabledGuard)
export class DbManagementController {
  constructor(private readonly dbManagementService: DbManagementService) {}

  @Post('migrate')
  @ApiOperation({
    summary: 'Run all pending migrations (idempotent)',
    description:
      'Executes all pending database migrations. Safe to call multiple times - already executed migrations are skipped.',
  })
  @ApiResponse({
    status: 200,
    description: 'Migrations executed successfully',
    type: DbOperationResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Database management endpoints are disabled',
  })
  @ApiResponse({
    status: 500,
    description: 'Migration failed',
  })
  async migrate(): Promise<DbOperationResponseDto> {
    return this.dbManagementService.runMigrations();
  }

  @Post('seed')
  @ApiOperation({
    summary: 'Run all database seeds (idempotent)',
    description:
      'Executes all database seeds. Safe to call multiple times - existing data is skipped.',
  })
  @ApiResponse({
    status: 200,
    description: 'Seeds executed successfully',
    type: DbOperationResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Database management endpoints are disabled',
  })
  @ApiResponse({
    status: 500,
    description: 'Seeding failed',
  })
  async seed(): Promise<DbOperationResponseDto> {
    return this.dbManagementService.runSeeds();
  }
}
