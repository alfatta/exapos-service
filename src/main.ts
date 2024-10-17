import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupValidation } from './shared/validation';
import { setupSwagger } from './shared/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: { origin: '*' },
    },
  );

  app.setGlobalPrefix('/api/v1');

  setupValidation(app);
  if (process.env.ENABLE_DOCUMENTATION) {
    setupSwagger(app);
  }

  await app.listen(PORT, () => {
    Logger.log(`App started on port ${PORT}`, 'Main');
  });
}
bootstrap();
