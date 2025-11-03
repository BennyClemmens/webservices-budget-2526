import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
  //  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, CorsConfig } from './config/configuration';
import { HttpExceptionFilter } from './lib/http-exception.filter';
import { createAppLogger } from './core/logger.helper';
import CustomLogger from './core/CustomLogger';

// --- ✅ One logger for the entire lifecycle
const appLogger: CustomLogger = createAppLogger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: appLogger,
  });

  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  const { origin, maxAge } = cors;
  //const log = config.get<LogConfig>('log')!;
  //const { levels } = log;

  //const customLogger = app.get(CustomLogger);
  appLogger.debug(`calling app.setGlobalPrefix('api');`, 'Bootstrap');

  app.setGlobalPrefix('api');

  appLogger.debug(`calling app.useGlobalPipes(...);`, 'Bootstrap');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );

  appLogger.debug(
    `calling app.useGlobalFilters(new HttpExceptionFilter());`,
    'Bootstrap',
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // appLogger.debug(`calling app.useLogger(...);`, 'Bootstrap');
  // app.useLogger(
  //   new CustomLogger({
  //     logLevels: levels,
  //   }),
  // );

  appLogger.debug(`calling app.enableCors(...);`, 'Bootstrap');
  app.enableCors({
    origin: origin,
    maxAge: maxAge,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(port, () => {
    //const url = await app.getUrl();
    appLogger.log(`Application is running on port: ${port}`, 'Bootstrap');
  });

  //const logger = new Logger('Bootstrap');
  // const url = await app.getUrl();
  // appLogger.log(`Application is running on: ${url}`);
}

bootstrap().catch((err) => {
  //const logger = new Logger('Bootstrap');
  appLogger.error(
    'Failed to start application',
    err instanceof Error ? err.stack : String(err),
  );
  process.exit(1);
});
