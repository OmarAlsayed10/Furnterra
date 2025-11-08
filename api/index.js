const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();

    const appModulePath = path.join(process.cwd(), 'furnterra-backend/dist/src/app.module');
    console.log('Looking for AppModule at:', appModulePath);

    const { AppModule } = require(appModulePath);
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

module.exports = async (req, res) => {
  try {
    console.log('Request:', req.method, req.url);
    const app = await bootstrap();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack
    });
  }
};