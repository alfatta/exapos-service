import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Example POS Service')
    .setDescription(
      `
API for managing POS Data

[Click here to download the JSON version for Postman](/api-documentation/json)

[Read here](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-from-swagger/) for more information about importing swagger to postman
      `,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document, {
    customSiteTitle: 'ExaPOS Service',
    jsonDocumentUrl: 'api-documentation/json',
  });
};
