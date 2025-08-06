import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Document & Admin;

export enum AdminPermission {
  ADD_BLOG = 'ADD_BLOG',
  EDIT_USER = 'EDIT_USER',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  MANAGE_ADMINS = 'MANAGE_ADMINS'
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
