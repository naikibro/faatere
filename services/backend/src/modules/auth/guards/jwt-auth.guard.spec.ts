import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    const createMockContext = (): ExecutionContext => {
      return {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
          getResponse: jest.fn().mockReturnValue({}),
        }),
        getType: jest.fn().mockReturnValue('http'),
        getArgs: jest.fn().mockReturnValue([]),
        getArgByIndex: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn(),
      } as unknown as ExecutionContext;
    };

    it('should return true for routes marked with @Public()', () => {
      const mockContext = createMockContext();
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        mockContext.getHandler(),
        mockContext.getClass(),
      ]);
    });

    it('should check both handler and class for @Public() metadata', () => {
      const mockContext = createMockContext();
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      guard.canActivate(mockContext);

      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        mockContext.getHandler(),
        mockContext.getClass(),
      ]);
    });

    it('should delegate to parent for non-public routes', async () => {
      const mockContext = createMockContext();
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      // For non-public routes, it calls super.canActivate() which triggers passport
      // In a unit test without passport registered, this will reject
      const result = guard.canActivate(mockContext);

      // The result should NOT be true (it's a promise from parent)
      expect(result).not.toBe(true);

      // Catch the expected rejection (passport not set up in unit test)
      await expect(Promise.resolve(result)).rejects.toBeDefined();
    });

    it('should not bypass auth when IS_PUBLIC_KEY is undefined', async () => {
      const mockContext = createMockContext();
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const result = guard.canActivate(mockContext);

      // Should NOT return true (should delegate to parent)
      expect(result).not.toBe(true);

      // Catch expected rejection
      await expect(Promise.resolve(result)).rejects.toBeDefined();
    });
  });
});
