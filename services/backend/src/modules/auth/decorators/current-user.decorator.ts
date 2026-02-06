import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../../entities';

/**
 * Parameter decorator to extract the current authenticated user from the request
 * Must be used on routes protected by JwtAuthGuard
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 * ```
 *
 * @example With property extraction
 * ```typescript
 * @Get('my-id')
 * @UseGuards(JwtAuthGuard)
 * getMyId(@CurrentUser('id') userId: string) {
 *   return userId;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (data) {
      return user?.[data];
    }

    return user;
  },
);
