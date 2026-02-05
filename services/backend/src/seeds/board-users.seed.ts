import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@shared/src/enums';
import { User, Tomite } from '../entities';
import { BUREAU_TOMITE_CODE } from './tomites.seed';
import { seedConfig, parseBoardUsers } from './seed.config';

const SALT_ROUNDS = 12;

export async function seedBoardUsers(dataSource: DataSource): Promise<void> {
  console.log('👥 Seeding board users...');

  const userRepository = dataSource.getRepository(User);
  const tomiteRepository = dataSource.getRepository(Tomite);

  // Get Bureau tomite
  const bureau = await tomiteRepository.findOne({
    where: { code: BUREAU_TOMITE_CODE },
  });

  if (!bureau) {
    throw new Error('Bureau tomite not found. Please run tomites seed first.');
  }

  // Parse board users from environment variable
  const boardUsers = parseBoardUsers(seedConfig.BOARD_USERS);
  console.log(`  📋 Found ${boardUsers.length} board user(s) to process`);

  let createdCount = 0;
  let skippedCount = 0;

  for (const { email, password } of boardUsers) {
    // Check if user already exists (idempotent)
    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      console.log(`  ⏭️  User ${email} already exists, skipping...`);
      skippedCount++;
      continue;
    }

    // Hash password with bcrypt (12 rounds per US spec)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = userRepository.create({
      email,
      passwordHash,
      role: UserRole.BOARD,
      isActive: true,
      tomiteId: bureau.id,
      memberId: null,
      invitedBy: null,
    });

    await userRepository.save(user);
    console.log(`  ✅ Created board user: ${email}`);
    createdCount++;
  }

  console.log(`  ✅ Board users seed complete: ${createdCount} created, ${skippedCount} skipped`);
}
