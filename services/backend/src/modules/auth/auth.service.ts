import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities';
import { AuthResponseDto, UserResponseDto } from './dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validates user credentials
   * @param email - User email
   * @param password - Plain text password
   * @returns User without password if valid, null otherwise
   * @throws ForbiddenException if account is disabled
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    // Check if account is active
    if (!user.isActive) {
      throw new ForbiddenException('Account is disabled');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Generates JWT tokens for authenticated user
   * @param user - Authenticated user entity
   * @returns Access token, refresh token, and user info
   */
  async login(user: User): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign({ ...payload });

    // Refresh token: 7 days in seconds
    const refreshToken = this.jwtService.sign(
      { ...payload },
      {
        expiresIn: 604800, // 7 days in seconds
      },
    );

    const userResponse: UserResponseDto = {
      id: user.id,
      email: user.email,
      role: user.role,
      tomiteId: user.tomiteId,
      isActive: user.isActive,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  /**
   * Validates and refreshes tokens
   * @param refreshToken - Current refresh token
   * @returns New access and refresh tokens
   * @throws UnauthorizedException if token is invalid
   */
  async refreshTokens(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.isActive) {
        throw new ForbiddenException('Account is disabled');
      }

      return this.login(user);
    } catch (error) {
      if (
        error instanceof ForbiddenException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Gets user by ID
   * @param userId - User ID
   * @returns User entity or null
   */
  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
