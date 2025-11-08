import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import express from 'express';

let cachedApp;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      credentials: true
    }
  });

  app.setGlobalPrefix("api")

  if (process.env.NODE_ENV !== "production") {
    app.useStaticAssets(join(__dirname, '..', 'upload'), {
      prefix: '/upload/'
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}

if (require.main === module) {
  bootstrap();
}

async function createApp() {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: ['error', 'warn', 'log']
      }
    );
    
    app.enableCors({
      origin: true,
      credentials: true
    });
    
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

export default async (req, res) => {
  const app = await createApp();
  return app(req, res);
};