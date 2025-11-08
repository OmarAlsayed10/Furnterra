import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import express from 'express';

const server = express();
let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.init();
  }
  return server;
}

export default async (req: any, res: any) => {
  const server = await bootstrap();
  server(req, res);
};