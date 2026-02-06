import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@shared/src/enums';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.SECRETARY,
  })
  role!: UserRole;

  @ApiProperty({
    description: 'Associated tomite ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
    nullable: true,
  })
  tomiteId!: string | null;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive!: boolean;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token (expires in 24h)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token (expires in 7 days)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Authenticated user information',
    type: UserResponseDto,
  })
  user!: UserResponseDto;
}
