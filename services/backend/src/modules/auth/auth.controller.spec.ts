import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../../entities';
import { UserRole } from '@shared/src/enums';
import { AuthResponseDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockUser: User = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    passwordHash: '$2b$10$hashedpassword',
    role: UserRole.BOARD,
    tomiteId: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockAuthResponse: AuthResponseDto = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: {
      id: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
      tomiteId: mockUser.tomiteId,
      isActive: mockUser.isActive,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            refreshTokens: jest.fn(),
            validateUser: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return auth response with tokens and user', async () => {
      authService.login.mockResolvedValue(mockAuthResponse);

      const result = await controller.login(
        { user: mockUser },
        { email: 'test@example.com', password: 'password' },
      );

      expect(result).toEqual(mockAuthResponse);
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('refresh', () => {
    it('should return new tokens when refresh token is valid', async () => {
      authService.refreshTokens.mockResolvedValue(mockAuthResponse);

      const result = await controller.refresh('valid-refresh-token');

      expect(result).toEqual(mockAuthResponse);
      expect(authService.refreshTokens).toHaveBeenCalledWith('valid-refresh-token');
    });
  });

  describe('getProfile', () => {
    it('should return user profile', () => {
      const result = controller.getProfile(mockUser);

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        tomiteId: mockUser.tomiteId,
        isActive: mockUser.isActive,
      });
    });
  });
});
