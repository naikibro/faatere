import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { User, Tomite, Member, Invitation } from './entities';
import { DbManagementModule } from './modules/db-management';
import { InitialSchema1770191785802 } from './migrations/1770191785802-InitialSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local'],
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        entities: [User, Tomite, Member, Invitation],
        migrations: [InitialSchema1770191785802],
        autoLoadEntities: true,
        migrationsRun: false,
        synchronize: false,
        logging: configService.get<string>('nodeEnv') === 'development',
      }),
    }),
    DbManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
