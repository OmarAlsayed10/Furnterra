import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true, type: [{ productId: String, quantity: Number }] })
  cartItems: {
    productId: string;
    quantity: number;
  }[];

  @Prop({
    type: {
      fullName: String,
      phone: String,
      city: String,
      street: String,
      country: String,
      zipcode: String,
    },
    default: null,
  })
  address: {
    fullName: string;
    phone: string;
    city: string;
    street: string;
    country: string;
    zipcode: string;
  };

  @Prop({ default: 'cash' })
  paymentMethod: string;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  totalAmount: number;

  @Prop({ default: 'processing' })
  orderStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
