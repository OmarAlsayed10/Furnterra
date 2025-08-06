import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.schema';
import { UsersModule } from '../users/users.module';
import { Product, ProductSchema } from '../products/products.schema';

@Module({
  imports:[
          MongooseModule.forFeature([{name:Order.name,schema:OrderSchema},{name:Product.name,schema:ProductSchema}]),
          UsersModule
      ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports:[OrdersService]
})
export class OrdersModule {}
