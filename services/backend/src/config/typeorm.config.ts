import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User, Tomite, Member, Invitation } from '../entities';

config({ path: '.env' });
config({ path: '.env.local' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://faatere:faatere_dev_password@localhost:5432/faatere',
  entities: [User, Tomite, Member, Invitation],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
