import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Document & Blog;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true, unique: false })
  content: string;

  @Prop({ required: true, type: [String] })
  image: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
