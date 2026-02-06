import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that triggers the local (username/password) authentication strategy
 * Use this guard on login endpoints
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
