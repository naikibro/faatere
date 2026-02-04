import { UserRole } from '../enums';

export interface IInvitation {
  id: string;
  email: string;
  token: string; // Unique token (UUID)
  expiresAt: Date;

  role: Exclude<UserRole, UserRole.BOARD>; // Only TOMITE_PRESIDENT or SECRETARY
  tomiteId: string;

  createdBy: string; // userId
  createdAt: Date;
  usedAt: Date | null;
}
