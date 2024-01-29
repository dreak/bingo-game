import { ConfigService } from '@config/config.service';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pjson from 'pjson';

/**
 * set up swagger document and ui
 */
export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  if (configService.EnvConfig.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Bingo game API Docs')
      .setVersion(pjson.version)
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, swaggerDocument, {
      customSiteTitle: 'Bingo game API Docs',
      swaggerOptions: {
        docExpansion: 'none'
      }
    });
  }
}

export function getSwaggerDocUiEndpoint(port: number) {
  return `Swagger API Docs UI:http://localhost:${port}/docs`;
}

export function getSwaggerDocEndpoint(port: number) {
  return `Swagger API Docs:http://localhost:${port}/docs-json`;
}
