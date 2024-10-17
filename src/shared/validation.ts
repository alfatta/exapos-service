import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';

export const setupValidation = (app: NestFastifyApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors
          .reduce(
            (a, c) =>
              c.constraints ? [...a, ...Object.values(c.constraints)] : a,
            [] as string[],
          )
          .join(', ');
        throw new BadRequestException(message);
      },
    }),
  );
};
