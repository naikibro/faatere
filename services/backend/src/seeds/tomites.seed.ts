import { DataSource } from 'typeorm';
import { Tomite } from '../entities';

export const BUREAU_TOMITE_CODE = 'BUR';

export async function seedTomites(dataSource: DataSource): Promise<Tomite> {
  console.log('📦 Seeding Bureau tomite...');

  const tomiteRepository = dataSource.getRepository(Tomite);

  // Check if Bureau already exists
  const existingBureau = await tomiteRepository.findOne({
    where: { code: BUREAU_TOMITE_CODE },
  });

  if (existingBureau) {
    console.log('  ⏭️  Bureau tomite already exists, skipping...');
    return existingBureau;
  }

  const bureau = tomiteRepository.create({
    code: BUREAU_TOMITE_CODE,
    name: 'Bureau',
    description: 'Bureau du parti - Administration centrale',
  });

  await tomiteRepository.save(bureau);
  console.log('  ✅ Created Bureau tomite');

  return bureau;
}
