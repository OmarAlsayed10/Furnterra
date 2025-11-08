import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      credentials: true
    }
  });


  if (process.env.NODE_ENV !== "production") {
    app.useStaticAssets(join(__dirname, '..', 'upload'), {
      prefix: '/upload/'
    })
  }

  await app.listen(process.env.PORT ?? 3000);
}

if (require.main === module) {
  bootstrap();
}
