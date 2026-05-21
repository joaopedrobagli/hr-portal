import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { TimeRecordsModule } from './time-records/time-records.module';
import { AuthModule } from './auth/auth.module';
import { Employee } from './employees/employee.entity';
import { TimeRecord } from './time-records/time-record.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [Employee, TimeRecord, User],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          };
        }
        return {
          type: 'postgres',
          host: config.get('DATABASE_HOST'),
          port: parseInt(config.get('DATABASE_PORT') ?? '5432'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          entities: [Employee, TimeRecord, User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    EmployeesModule,
    TimeRecordsModule,
    AuthModule,
  ],
})
export class AppModule {}