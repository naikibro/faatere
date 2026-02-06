import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark a route as public (no authentication required)
 * Use on controller methods or entire controllers to bypass JWT validation
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'This is accessible without authentication';
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
