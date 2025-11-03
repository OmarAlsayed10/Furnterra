import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true, unique: false })
  description: string;

  @Prop({ required: true, unique: false })
  price: number;

  @Prop()
  discount?: number;

  @Prop()
  brand?: string;

  @Prop()
  category?: string;

  @Prop({ type: [String] })
  images?: string[];

  @Prop()
  inStock?: boolean;

  @Prop()
  stock: number;

  @Prop()
  sold: number;

  @Prop()
  isFeatured: Boolean;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
