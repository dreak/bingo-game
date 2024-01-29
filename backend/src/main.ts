import { ConfigService } from '@config/config.service';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getSwaggerDocEndpoint, getSwaggerDocUiEndpoint, setupSwagger } from 'src/setup-swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { Logger } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  // disable power by header
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // CORS
  app.enableCors();

  // use winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.setGlobalPrefix('/bingo');

  // setup swagger document and ui
  setupSwagger(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.EnvConfig.PORT);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER).logger as Logger;
  logger.info(getSwaggerDocUiEndpoint(configService.EnvConfig.PORT));
  logger.info(getSwaggerDocEndpoint(configService.EnvConfig.PORT));
}
bootstrap();
