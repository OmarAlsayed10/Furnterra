import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PendingUserDocument = PendingUser & Document

@Schema({timestamps:{createdAt:true},versionKey:false})

export class PendingUser{

    @Prop({expires:300})
    createdAt:Date

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true,unique:true})
    firstName:string;

    @Prop({required:true,unique:true})
    lastName:string

    @Prop({required:true})
    password:string;

    @Prop({type:String, default:null})
    otp:string|null;

    @Prop({type:Date,default:null})
    otpExpiresAt:Date|null;

}

export const PendingUserSchema = SchemaFactory.createForClass(PendingUser)