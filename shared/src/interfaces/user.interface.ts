import { UserRole } from '../enums';

export interface IUser {
  id: string;
  email: string;
  passwordHash: string;

  role: UserRole;
  tomiteId: string | null; // null for BOARD (global access)

  isActive: boolean;

  // Optional link to a member
  memberId: string | null;

  createdAt: Date;
  updatedAt: Date;
  invitedBy: string; // userId of creator
}
