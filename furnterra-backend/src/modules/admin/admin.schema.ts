import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Document & Admin;

export enum AdminPermission {
  ADD_BLOG = 'ADD_BLOG',
  DELETE_BLOG = 'DELETE_BLOG',
  EDIT_BLOG = 'EDIT_BLOG',
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
}

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: AdminPermission, default: [] })
  permissions: AdminPermission[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
