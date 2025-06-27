import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema({timestamps:true})

export class User{
    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true,unique:true})
    firstName:string;

    @Prop({required:true,unique:true})
    lastName:string

    @Prop({required:true})
    password:string;

    @Prop()
    provider:'local' | 'google';

    @Prop()
    googleId?:string;

    @Prop({type:String, default:null})
    otp:string|null;

    @Prop({isVerified:false})
    isVerified:boolean;

    @Prop({type:Date,default:null})
    otpExpiresAt:Date|null;

    @Prop({default:"user",enum:["user","admin"]})
    role:"user" | "admin";
}

export const UserSchema = SchemaFactory.createForClass(User)