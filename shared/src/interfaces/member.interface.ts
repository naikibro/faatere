import { PaymentMethod } from '../enums';

export interface IMember {
  id: string;

  // Identity (natural key for duplicate detection)
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthPlace: string;

  // Contact
  address: string;
  email?: string;
  phone?: string;

  // Photo
  photoUrl?: string;

  // Membership
  memberNumber: string; // Format: {TOMITE_CODE}-{YEAR}-{SEQUENCE}
  membershipDate: Date;
  tomiteId: string; // Current tomite
  originalTomiteId: string; // Original tomite (for member number)

  // Payment V1
  hasPaid: boolean;
  paymentMethod: PaymentMethod | null;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // userId
}
