import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';


require('dotenv').config();

async function bootstrap() {
  if (!existsSync(process.env.UPLOAD_PATH)) {
    mkdirSync(process.env.UPLOAD_PATH, { recursive: true });
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.setGlobalPrefix('/api');
  app.enableCors();

  app.useStaticAssets(process.env.UPLOAD_PATH, { prefix: '/images/' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);
}
bootstrap();
