/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import { AppModule }      from './app/app.module';
import { setupSession }   from './config/setup-session';
import { setupSwagger }   from './config/setup-swagger';

const env = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSession(app);
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true })
  );

  const port = env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
