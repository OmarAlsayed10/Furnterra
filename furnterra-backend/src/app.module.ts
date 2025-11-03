import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { PendingUserModule } from './modules/auth/pending-user/pending-user.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminService } from './modules/admin/admin.service';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    PendingUserModule,
    BlogsModule,
    OrdersModule,
    UploadModule,
  ],
  controllers: [UsersController],
  providers: [AdminService],
})
export class AppModule {}
