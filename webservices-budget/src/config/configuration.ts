// src/config/configuration.ts
export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000'),
  cors: {
    origin: process.env.CORS_ORIGIN
      ? (JSON.parse(process.env.CORS_ORIGIN) as string[])
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE || String(3 * 60 * 60)),
  },
});

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
}

export interface CorsConfig {
  origin: string[];
  maxAge: number;
}
