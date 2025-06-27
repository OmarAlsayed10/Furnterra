import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type productDocument = Product & Document

@Schema()
export class Product{
    @Prop({required:true,unique:true})
    name:string

    @Prop({required:true,unique:true})
    price:string

    @Prop({required:true})
    Description:string

    @Prop()
    Quantity:string

    @Prop()
    Brand:string

    @Prop()
    images:[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)