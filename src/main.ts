import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json());  // ✅ รองรับ JSON
  app.use(express.urlencoded({ extended: true })); // ✅ รองรับ Form-Data

  // Serve static files from the 'uploads' directory
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  await app.listen(3001);
}
bootstrap();
