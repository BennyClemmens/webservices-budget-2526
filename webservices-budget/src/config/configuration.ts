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
});

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  database: DatabaseConfig;
  log: LogConfig;
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
