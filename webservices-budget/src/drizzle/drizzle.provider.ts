import { ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { DatabaseConfig, ServerConfig } from '../config/configuration';
import { Inject, Provider } from '@nestjs/common';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider[] = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: (
      configService: ConfigService<ServerConfig>,
    ): MySql2Database => {
      const databaseConfig = configService.get<DatabaseConfig>('database')!;
      return drizzle({
        client: mysql.createPool({
          uri: databaseConfig.url,
          connectionLimit: 5,
        }),
        mode: 'default',
      });
    },
  },
];

export const InjectDrizzle = () => Inject(DrizzleAsyncProvider);
