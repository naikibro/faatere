import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@shared/src/enums';
import { User, Tomite } from '../entities';
import { BUREAU_TOMITE_CODE } from './tomites.seed';
import { seedConfig } from './seed.config';

const SALT_ROUNDS = 10;

export async function seedBoardUsers(dataSource: DataSource): Promise<void> {
  console.log('👥 Seeding board users...');

  const userRepository = dataSource.getRepository(User);
  const tomiteRepository = dataSource.getRepository(Tomite);

  // Check if already seeded
  const existingBoardUsers = await userRepository.count({
    where: { role: UserRole.BOARD },
  });
  if (existingBoardUsers > 0) {
    console.log('  ⏭️  Board users already seeded, skipping...');
    return;
  }

  // Get Bureau tomite
  const bureau = await tomiteRepository.findOne({
    where: { code: BUREAU_TOMITE_CODE },
  });

  if (!bureau) {
    throw new Error('Bureau tomite not found. Please run tomites seed first.');
  }

  // Board user emails from environment config
  const boardUserEmails = seedConfig.SEED_BOARD_EMAILS.split(',').map((e) => e.trim());

  const passwordHash = await bcrypt.hash(seedConfig.SEED_DEFAULT_PASSWORD, SALT_ROUNDS);

  for (const email of boardUserEmails) {
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
  }

  console.log(`  ✅ Created ${boardUserEmails.length} board users in Bureau`);
}
