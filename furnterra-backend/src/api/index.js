const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    
    const { AppModule } = require('../dist/app.module');
    
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { 
        logger: ['error', 'warn', 'log'],
        cors: {
          origin: true,
          credentials: true
        }
      }
    );
    
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  try {
    const app = await bootstrap();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
};