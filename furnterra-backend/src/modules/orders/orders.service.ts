import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './orders.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createOrderDto } from './dto/create-order.dto';
import { Product, ProductDocument } from '../products/products.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel:Model<ProductDocument>
  ) {}

  async createOrder(orderData: createOrderDto): Promise<Order> {


    for(const item of orderData.cartItems){
      const product = await this.productModel.findByIdAndUpdate(item.productId)

      if(!product){
        throw new BadRequestException(`The Product with the id: ${item.productId} is not found`)
      }

      if(product.stock < item.quantity){
        throw new BadRequestException(`Not enough stock of product ${product.name}`)
      }

      product.stock -= item.quantity
      product.inStock = product.stock > 0
      product.sold = (product.sold || 0) + item.quantity

      await product.save()
    }

    const newOrder = new this.orderModel(orderData);
    return newOrder.save();
  }

  async markOrderAsPaid(orderId: string): Promise<Order | null> {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { isPaid: true, orderStatus: 'Confirmed' },
      { new: true },
    );
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }
}
