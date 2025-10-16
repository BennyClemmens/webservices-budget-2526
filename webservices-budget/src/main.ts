import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);

  const logger = new Logger('Bootstrap');
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error(
    'Failed to start application',
    err instanceof Error ? err.stack : String(err),
  );
  process.exit(1);
});
