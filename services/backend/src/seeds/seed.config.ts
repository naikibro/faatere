import { z } from 'zod';
import { config } from 'dotenv';

config({ path: '.env' });
config({ path: '.env.local' });

export interface BoardUser {
  email: string;
  password: string;
}

const seedEnvSchema = z.object({
  DATABASE_URL: z.string({ message: 'DATABASE_URL is required for seeding' }),
  BOARD_USERS: z
    .string({ message: 'BOARD_USERS is required. Format: email1:password1,email2:password2' })
    .min(1, 'BOARD_USERS cannot be empty'),
});

const emailSchema = z.string().email();

export function parseBoardUsers(boardUsersEnv: string): BoardUser[] {
  const users: BoardUser[] = [];
  const seenEmails = new Set<string>();

  const userEntries = boardUsersEnv.split(',').map((entry) => entry.trim());

  for (const entry of userEntries) {
    if (!entry) continue;

    const colonIndex = entry.indexOf(':');
    if (colonIndex === -1) {
      throw new Error(`Invalid BOARD_USERS format for entry "${entry}". Expected "email:password"`);
    }

    const email = entry.substring(0, colonIndex).trim().toLowerCase();
    const password = entry.substring(colonIndex + 1).trim();

    if (!email || !password) {
      throw new Error(`Invalid BOARD_USERS entry "${entry}". Both email and password are required.`);
    }

    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      throw new Error(`Invalid email format for "${email}". Expected a valid email address.`);
    }

    if (seenEmails.has(email)) {
      throw new Error(`Duplicate email "${email}" in BOARD_USERS. Each email must be unique.`);
    }
    seenEmails.add(email);

    if (password.length < 8) {
      throw new Error(`Password for ${email} must be at least 8 characters.`);
    }

    users.push({ email, password });
  }

  if (users.length === 0) {
    throw new Error('BOARD_USERS must contain at least one valid user entry.');
  }

  return users;
}

export function getSeedConfig() {
  const parsed = seedEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid seed environment configuration:');
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
