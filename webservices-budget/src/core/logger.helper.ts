import CustomLogger from './CustomLogger';
import { LOG_LEVELS, type LogLevel } from '@nestjs/common';

export function createAppLogger(): CustomLogger {
  let logLevels: LogLevel[];
  const env = process.env.LOG_LEVELS;

  try {
    if (!env) {
      logLevels = LOG_LEVELS;
    } else {
      logLevels = JSON.parse(env) as LogLevel[];
    }
  } catch (err) {
    console.error(`⚠️ Failed to parse LOG_LEVELS from env (${env})`, err);
    logLevels = LOG_LEVELS;
  }

  const customLogger = new CustomLogger({ logLevels });
  customLogger.debug(
    `Logger initialized with levels: [${logLevels.join(',')}]`,
    'LoggerHelper',
  );

  return customLogger;
}
