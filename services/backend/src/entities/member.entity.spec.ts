import { Member } from './member.entity';
import { Tomite } from './tomite.entity';
import { User } from './user.entity';
import { PaymentMethod } from '@shared/src/enums';

describe('Member Entity', () => {
  describe('structure', () => {
    it('should create a member with all required properties', () => {
      const member = new Member();
      member.id = '123e4567-e89b-12d3-a456-426614174000';
      member.firstName = 'Jean';
      member.lastName = 'Dupont';
      member.birthDate = new Date('1990-01-15');
      member.birthPlace = 'Papeete';
      member.address = '123 Rue de la Paix';
      member.memberNumber = 'MEM-001';
      member.membershipDate = new Date('2024-01-01');
      member.tomiteId = '123e4567-e89b-12d3-a456-426614174001';
      member.originalTomiteId = '123e4567-e89b-12d3-a456-426614174001';
      member.hasPaid = false;
      member.createdBy = '123e4567-e89b-12d3-a456-426614174002';

      expect(member.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(member.firstName).toBe('Jean');
      expect(member.lastName).toBe('Dupont');
      expect(member.birthPlace).toBe('Papeete');
      expect(member.memberNumber).toBe('MEM-001');
      expect(member.hasPaid).toBe(false);
    });

    it('should allow optional email and phone', () => {
      const member = new Member();
      member.email = null;
      member.phone = null;

      expect(member.email).toBeNull();
      expect(member.phone).toBeNull();

      member.email = 'jean@example.com';
      member.phone = '+689 87 12 34 56';

      expect(member.email).toBe('jean@example.com');
      expect(member.phone).toBe('+689 87 12 34 56');
    });

    it('should allow optional photo URL', () => {
      const member = new Member();
      member.photoUrl = null;

      expect(member.photoUrl).toBeNull();

      member.photoUrl = 'https://example.com/photo.jpg';
      expect(member.photoUrl).toBe('https://example.com/photo.jpg');
    });

    it('should support all payment methods', () => {
      const member = new Member();

      member.paymentMethod = PaymentMethod.CASH;
      expect(member.paymentMethod).toBe(PaymentMethod.CASH);

      member.paymentMethod = PaymentMethod.CARD;
      expect(member.paymentMethod).toBe(PaymentMethod.CARD);

      member.paymentMethod = PaymentMethod.TRANSFER;
      expect(member.paymentMethod).toBe(PaymentMethod.TRANSFER);

      member.paymentMethod = null;
      expect(member.paymentMethod).toBeNull();
    });
  });

  describe('relations', () => {
    it('should have current tomite relation', () => {
      const member = new Member();
      const tomite = new Tomite();
      tomite.id = '123e4567-e89b-12d3-a456-426614174001';
      tomite.code = 'FE';

      member.tomiteId = tomite.id;
      member.tomite = tomite;

      expect(member.tomite).toBe(tomite);
      expect(member.tomiteId).toBe(tomite.id);
    });

    it('should have original tomite relation for tracking transfers', () => {
      const currentTomite = new Tomite();
      currentTomite.id = '123e4567-e89b-12d3-a456-426614174001';
      currentTomite.code = 'FE';

      const originalTomite = new Tomite();
      originalTomite.id = '123e4567-e89b-12d3-a456-426614174002';
      originalTomite.code = 'FO';

      const member = new Member();
      member.tomiteId = currentTomite.id;
      member.tomite = currentTomite;
      member.originalTomiteId = originalTomite.id;
      member.originalTomite = originalTomite;

      expect(member.tomite.code).toBe('FE');
      expect(member.originalTomite.code).toBe('FO');
    });

    it('should have optional user relation', () => {
      const member = new Member();
      member.user = null;

      expect(member.user).toBeNull();

      const user = new User();
      user.id = '123e4567-e89b-12d3-a456-426614174003';
      member.user = user;

      expect(member.user).toBe(user);
    });

    it('should have createdBy user relation', () => {
      const member = new Member();
      const creator = new User();
      creator.id = '123e4567-e89b-12d3-a456-426614174004';

      member.createdBy = creator.id;
      member.createdByUser = creator;

      expect(member.createdBy).toBe(creator.id);
      expect(member.createdByUser).toBe(creator);
    });
  });
});
