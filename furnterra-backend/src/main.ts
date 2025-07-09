import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:{
    origin:"http://localhost:4200",
    credentials:true
  }});

   app.useStaticAssets(join(__dirname,'..','upload'),{
    prefix:'/upload/'
   })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
