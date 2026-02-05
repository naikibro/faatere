import { User } from './user.entity';
import { Tomite } from './tomite.entity';
import { Member } from './member.entity';
import { UserRole } from '@shared/src/enums';

describe('User Entity', () => {
  describe('structure', () => {
    it('should create a user with all required properties', () => {
      const user = new User();
      user.id = '123e4567-e89b-12d3-a456-426614174000';
      user.email = 'test@example.com';
      user.passwordHash = 'hashed_password';
      user.role = UserRole.BOARD;
      user.isActive = true;
      user.tomiteId = null;
      user.memberId = null;
      user.invitedBy = null;

      expect(user.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(user.email).toBe('test@example.com');
      expect(user.passwordHash).toBe('hashed_password');
      expect(user.role).toBe(UserRole.BOARD);
      expect(user.isActive).toBe(true);
    });

    it('should support all user roles', () => {
      const user = new User();

      user.role = UserRole.BOARD;
      expect(user.role).toBe(UserRole.BOARD);

      user.role = UserRole.TOMITE_PRESIDENT;
      expect(user.role).toBe(UserRole.TOMITE_PRESIDENT);

      user.role = UserRole.SECRETARY;
      expect(user.role).toBe(UserRole.SECRETARY);
    });

    it('should allow optional tomite association', () => {
      const user = new User();
      user.tomiteId = null;
      user.tomite = null;

      expect(user.tomiteId).toBeNull();
      expect(user.tomite).toBeNull();

      const tomite = new Tomite();
      tomite.id = '123e4567-e89b-12d3-a456-426614174001';
      user.tomiteId = tomite.id;
      user.tomite = tomite;

      expect(user.tomiteId).toBe(tomite.id);
      expect(user.tomite).toBe(tomite);
    });

    it('should allow optional member association', () => {
      const user = new User();
      user.memberId = null;
      user.member = null;

      expect(user.memberId).toBeNull();
      expect(user.member).toBeNull();

      const member = new Member();
      member.id = '123e4567-e89b-12d3-a456-426614174002';
      user.memberId = member.id;
      user.member = member;

      expect(user.memberId).toBe(member.id);
      expect(user.member).toBe(member);
    });
  });
});
