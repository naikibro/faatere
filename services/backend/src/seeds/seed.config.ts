import { z } from 'zod';
import { config } from 'dotenv';

config({ path: '.env' });
config({ path: '.env.local' });

const seedEnvSchema = z.object({
  DATABASE_URL: z.string({ message: 'DATABASE_URL is required for seeding' }),
  SEED_DEFAULT_PASSWORD: z
    .string({ message: 'SEED_DEFAULT_PASSWORD is required. Set it in .env file.' })
    .min(8, 'SEED_DEFAULT_PASSWORD must be at least 8 characters'),
  SEED_BOARD_EMAILS: z
    .string()
    .optional()
    .default('admin@pacificknowledge.dev,naikibro@gmail.com'),
});

const parsed = seedEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid seed environment configuration:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const seedConfig = parsed.data;
