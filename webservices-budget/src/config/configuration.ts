import { LogLevel } from '@nestjs/common';

export default (): ServerConfig => ({
  env: process.env.NODE_ENV as string,
  port: parseInt(process.env.PORT as string),
  cors: {
    origin: process.env.CORS_ORIGIN
      ? (JSON.parse(process.env.CORS_ORIGIN) as string[])
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE as string),
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
  log: {
    levels: process.env.LOG_LEVELS
      ? (JSON.parse(process.env.LOG_LEVELS) as LogLevel[])
      : (['log', 'error', 'warn'] as LogLevel[]),
  },
  auth: {
    hashLength: parseInt(process.env.AUTH_HASH_LENGTH || '32'),
    timeCost: parseInt(process.env.AUTH_HASH_TIME_COST || '6'),
    memoryCost: parseInt(process.env.AUTH_HASH_MEMORY_COST || '65536'),
    jwt: {
      expirationInterval:
        Number(process.env.AUTH_JWT_EXPIRATION_INTERVAL) || 3600,
      secret: process.env.AUTH_JWT_SECRET || '',
      audience: process.env.AUTH_JWT_AUDIENCE || 'budget.hogent.be',
      issuer: process.env.AUTH_JWT_ISSUER || 'budget.hogent.be',
    },
  },
});

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  database: DatabaseConfig;
  log: LogConfig;
  auth: AuthConfig;
}

export interface CorsConfig {
  origin: string[];
  maxAge: number;
}

export interface DatabaseConfig {
  url: string;
}

export interface LogConfig {
  levels: LogLevel[]; // "verbose" | "debug" | "log" | "warn" | "error" | "fatal"
}

//type LogLevel = 'verbose' | 'debug' | 'log' | 'warn' | 'error' | 'fatal';

export interface JwtConfig {
  expirationInterval: number;
  secret: string;
  audience: string;
  issuer: string;
}

export interface AuthConfig {
  hashLength: number;
  timeCost: number;
  memoryCost: number;
  jwt: JwtConfig;
}
