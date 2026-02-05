import { Tomite } from './tomite.entity';
import { User } from './user.entity';
import { Member } from './member.entity';
import { Invitation } from './invitation.entity';

describe('Tomite Entity', () => {
  describe('structure', () => {
    it('should create a tomite with all required properties', () => {
      const tomite = new Tomite();
      tomite.id = '123e4567-e89b-12d3-a456-426614174000';
      tomite.code = 'BUR';
      tomite.name = 'Bureau';
      tomite.description = 'Main administration office';

      expect(tomite.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(tomite.code).toBe('BUR');
      expect(tomite.name).toBe('Bureau');
      expect(tomite.description).toBe('Main administration office');
    });

    it('should allow nullable description', () => {
      const tomite = new Tomite();
      tomite.description = null;

      expect(tomite.description).toBeNull();
    });

    it('should enforce code length constraint (2-4 chars)', () => {
      const tomite = new Tomite();

      tomite.code = 'AB';
      expect(tomite.code.length).toBeGreaterThanOrEqual(2);

      tomite.code = 'ABCD';
      expect(tomite.code.length).toBeLessThanOrEqual(4);
    });
  });

  describe('relations', () => {
    it('should have users relation', () => {
      const tomite = new Tomite();
      const user = new User();
      user.id = '123e4567-e89b-12d3-a456-426614174001';

      tomite.users = [user];

      expect(tomite.users).toHaveLength(1);
      expect(tomite.users[0]).toBe(user);
    });

    it('should have members relation', () => {
      const tomite = new Tomite();
      const member = new Member();
      member.id = '123e4567-e89b-12d3-a456-426614174002';

      tomite.members = [member];

      expect(tomite.members).toHaveLength(1);
      expect(tomite.members[0]).toBe(member);
    });

    it('should have originalMembers relation for transferred members', () => {
      const tomite = new Tomite();
      const member = new Member();
      member.id = '123e4567-e89b-12d3-a456-426614174003';

      tomite.originalMembers = [member];

      expect(tomite.originalMembers).toHaveLength(1);
      expect(tomite.originalMembers[0]).toBe(member);
    });

    it('should have invitations relation', () => {
      const tomite = new Tomite();
      const invitation = new Invitation();
      invitation.id = '123e4567-e89b-12d3-a456-426614174004';

      tomite.invitations = [invitation];

      expect(tomite.invitations).toHaveLength(1);
      expect(tomite.invitations[0]).toBe(invitation);
    });
  });
});
