import { AuditAction } from '../enums';

export interface IAuditLog {
  id: string;

  entityType: 'MEMBER';
  entityId: string;
  action: AuditAction;

  performedBy: string; // userId
  performedAt: Date;

  changes: Record<
    string,
    {
      old: unknown;
      new: unknown;
    }
  >;

  tomiteId: string;
}
