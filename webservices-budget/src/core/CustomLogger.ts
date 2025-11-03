// import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { ConsoleLogger, LogLevel, LoggerService } from '@nestjs/common';

interface CustomLoggerOptions {
  logLevels?: LogLevel[];
  context?: string;
}
// @Injectable()
export default class CustomLogger
  extends ConsoleLogger
  implements LoggerService
{
  constructor(options?: CustomLoggerOptions) {
    super(options?.context ?? 'App', {
      logLevels: options?.logLevels ?? [
        'debug',
        'error',
        'fatal',
        'log',
        'verbose',
        'warn',
      ],
    });
  }

  log(message: any, context?: string) {
    super.log(`📢 ${message}`, context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(`❌ ${message}`, trace, context);
  }

  warn(message: any, context?: string) {
    super.warn(`⚠️ ${message}`, context);
  }

  debug(message: any, context?: string) {
    super.debug(`🐞 ${message}`, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(`📖 ${message}`, context);
  }
}
