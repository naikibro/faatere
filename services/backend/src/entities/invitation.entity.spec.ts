import { Invitation } from './invitation.entity';
import { Tomite } from './tomite.entity';
import { User } from './user.entity';
import { InvitationRole } from '@shared/src/enums';

describe('Invitation Entity', () => {
  describe('structure', () => {
    it('should create an invitation with all required properties', () => {
      const invitation = new Invitation();
      invitation.id = '123e4567-e89b-12d3-a456-426614174000';
      invitation.email = 'invitee@example.com';
      invitation.token = 'unique-token-123';
      invitation.expiresAt = new Date('2024-12-31');
      invitation.role = InvitationRole.SECRETARY;
      invitation.tomiteId = '123e4567-e89b-12d3-a456-426614174001';
      invitation.createdBy = '123e4567-e89b-12d3-a456-426614174002';
      invitation.usedAt = null;

      expect(invitation.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(invitation.email).toBe('invitee@example.com');
      expect(invitation.token).toBe('unique-token-123');
      expect(invitation.role).toBe(InvitationRole.SECRETARY);
      expect(invitation.usedAt).toBeNull();
    });

    it('should support TOMITE_PRESIDENT and SECRETARY roles', () => {
      const invitation = new Invitation();

      invitation.role = InvitationRole.TOMITE_PRESIDENT;
      expect(invitation.role).toBe(InvitationRole.TOMITE_PRESIDENT);

      invitation.role = InvitationRole.SECRETARY;
      expect(invitation.role).toBe(InvitationRole.SECRETARY);
    });

    it('should track when invitation is used', () => {
      const invitation = new Invitation();
      invitation.usedAt = null;

      expect(invitation.usedAt).toBeNull();

      const usedDate = new Date('2024-06-15T10:30:00Z');
      invitation.usedAt = usedDate;

      expect(invitation.usedAt).toBe(usedDate);
    });

    it('should have expiration date', () => {
      const invitation = new Invitation();
      const expiresAt = new Date('2024-12-31T23:59:59Z');
      invitation.expiresAt = expiresAt;

      expect(invitation.expiresAt).toBe(expiresAt);
    });
  });

  describe('relations', () => {
    it('should have tomite relation', () => {
      const invitation = new Invitation();
      const tomite = new Tomite();
      tomite.id = '123e4567-e89b-12d3-a456-426614174001';
      tomite.code = 'FE';

      invitation.tomiteId = tomite.id;
      invitation.tomite = tomite;

      expect(invitation.tomite).toBe(tomite);
      expect(invitation.tomiteId).toBe(tomite.id);
    });

    it('should have createdBy user relation', () => {
      const invitation = new Invitation();
      const creator = new User();
      creator.id = '123e4567-e89b-12d3-a456-426614174002';

      invitation.createdBy = creator.id;
      invitation.createdByUser = creator;

      expect(invitation.createdBy).toBe(creator.id);
      expect(invitation.createdByUser).toBe(creator);
    });
  });
});
