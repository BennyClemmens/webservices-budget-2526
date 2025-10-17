import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from './config/configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;

  app.setGlobalPrefix('api');

  await app.listen(port);

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
