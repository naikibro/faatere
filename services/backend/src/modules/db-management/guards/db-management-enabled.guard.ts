import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbManagementEnabledGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(_context: ExecutionContext): boolean {
    const isEnabled = this.configService.get<boolean>('dbManagement.enabled');

    if (!isEnabled) {
      throw new ForbiddenException(
        'Database management endpoints are disabled. Set DB_MANAGEMENT_ENABLED=true to enable.',
      );
    }

    return true;
  }
}
