import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { AdminModule } from './modules/admin/admin.module';
import { PendingUserModule } from './modules/auth/pending-user/pending-user.module';



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
    PendingUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
