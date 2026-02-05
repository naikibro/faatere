import { Module } from '@nestjs/common';
import { DbManagementController } from './db-management.controller';
import { DbManagementService } from './db-management.service';

@Module({
  controllers: [DbManagementController],
  providers: [DbManagementService],
  exports: [DbManagementService],
})
export class DbManagementModule {}
