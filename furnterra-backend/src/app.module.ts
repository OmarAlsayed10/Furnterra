import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { AdminModule } from './modules/admin/admin.module';
import { PendingUserModule } from './modules/auth/pending-user/pending-user.module';
import { BlogsService } from './modules/blogs/blogs.service';
import { BlogsController } from './modules/blogs/blogs.controller';
import { BlogsModule } from './modules/blogs/blogs.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService:ConfigService)=>({
        uri:configService.get<string>('MONGODB_URI',{infer:true}),
      }),
      inject:[ConfigService]
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    AdminModule,
    PendingUserModule,
    BlogsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
