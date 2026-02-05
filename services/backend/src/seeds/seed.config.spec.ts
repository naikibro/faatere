import { parseBoardUsers } from './seed.config';

describe('parseBoardUsers', () => {
  describe('valid inputs', () => {
    it('should parse a single user entry', () => {
      const result = parseBoardUsers('admin@example.com:Password123');
      expect(result).toEqual([{ email: 'admin@example.com', password: 'Password123' }]);
    });

    it('should parse multiple user entries', () => {
      const result = parseBoardUsers('admin@example.com:Pass1234,user@test.com:Pass5678');
      expect(result).toEqual([
        { email: 'admin@example.com', password: 'Pass1234' },
        { email: 'user@test.com', password: 'Pass5678' },
      ]);
    });

    it('should handle passwords containing colons', () => {
      const result = parseBoardUsers('admin@example.com:Pass:word:123');
      expect(result).toEqual([{ email: 'admin@example.com', password: 'Pass:word:123' }]);
    });

    it('should trim whitespace from entries', () => {
      const result = parseBoardUsers('  admin@example.com : Password123  ,  user@test.com:Pass5678  ');
      expect(result).toEqual([
        { email: 'admin@example.com', password: 'Password123' },
        { email: 'user@test.com', password: 'Pass5678' },
      ]);
    });

    it('should normalize email to lowercase', () => {
      const result = parseBoardUsers('Admin@Example.COM:Password123');
      expect(result).toEqual([{ email: 'admin@example.com', password: 'Password123' }]);
    });

    it('should skip empty entries from extra commas', () => {
      const result = parseBoardUsers('admin@example.com:Password123,,user@test.com:Pass5678,');
      expect(result).toEqual([
        { email: 'admin@example.com', password: 'Password123' },
        { email: 'user@test.com', password: 'Pass5678' },
      ]);
    });
  });

  describe('invalid inputs', () => {
    it('should throw on missing colon separator', () => {
      expect(() => parseBoardUsers('adminexample.comPassword123')).toThrow(
        'Invalid BOARD_USERS format for entry "adminexample.comPassword123". Expected "email:password"',
      );
    });

    it('should throw on empty email', () => {
      expect(() => parseBoardUsers(':Password123')).toThrow(
        'Both email and password are required',
      );
    });

    it('should throw on empty password', () => {
      expect(() => parseBoardUsers('admin@example.com:')).toThrow(
        'Both email and password are required',
      );
    });

    it('should throw on invalid email format', () => {
      expect(() => parseBoardUsers('not-an-email:Password123')).toThrow(
        'Invalid email format for "not-an-email". Expected a valid email address.',
      );
    });

    it('should throw on email without domain', () => {
      expect(() => parseBoardUsers('admin@:Password123')).toThrow(
        'Invalid email format',
      );
    });

    it('should throw on email without TLD', () => {
      expect(() => parseBoardUsers('admin@example:Password123')).toThrow(
        'Invalid email format',
      );
    });

    it('should throw on password shorter than 8 characters', () => {
      expect(() => parseBoardUsers('admin@example.com:Short1')).toThrow(
        'Password for admin@example.com must be at least 8 characters',
      );
    });

    it('should throw on duplicate emails', () => {
      expect(() =>
        parseBoardUsers('admin@example.com:Password123,admin@example.com:DifferentPass'),
      ).toThrow('Duplicate email "admin@example.com" in BOARD_USERS. Each email must be unique.');
    });

    it('should detect duplicates case-insensitively', () => {
      expect(() =>
        parseBoardUsers('Admin@Example.com:Password123,admin@example.com:DifferentPass'),
      ).toThrow('Duplicate email');
    });

    it('should throw on empty BOARD_USERS', () => {
      expect(() => parseBoardUsers('')).toThrow(
        'BOARD_USERS must contain at least one valid user entry',
      );
    });

    it('should throw when all entries are empty', () => {
      expect(() => parseBoardUsers(',,,  ,  ')).toThrow(
        'BOARD_USERS must contain at least one valid user entry',
      );
    });
  });
});
