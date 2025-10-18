// src/config/configuration.ts
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
});

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  database: DatabaseConfig;
}

export interface CorsConfig {
  origin: string[];
  maxAge: number;
}

export interface DatabaseConfig {
  url: string;
}
