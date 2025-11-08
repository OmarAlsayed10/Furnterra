const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();
let app;

async function bootstrap() {
  if (!app) {
    // Import from the compiled dist folder
    const { AppModule } = require('../dist/app.module');
    
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    
    app.enableCors({
      origin:true,
      credentials:true
    });
    app.setGlobalPrefix('api');
    await app.init();
  }
  return server;
}

module.exports = async (req, res) => {
  const server = await bootstrap();
  server(req, res);
};