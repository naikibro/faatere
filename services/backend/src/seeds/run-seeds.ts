import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../config/typeorm.config';
import { seedBoardUsers } from './board-users.seed';
import { seedTomites } from './tomites.seed';

async function runSeeds() {
  console.log('🌱 Starting database seeding...');

  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  try {
    // Seed in order of dependencies
    await seedTomites(dataSource);
    await seedBoardUsers(dataSource);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();
