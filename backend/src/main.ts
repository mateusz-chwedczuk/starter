import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'reflect-metadata';

export async function appSetup(app: INestApplication): Promise<void> {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await appSetup(app);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
