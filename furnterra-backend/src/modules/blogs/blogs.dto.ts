import { IsString } from "class-validator";

export class BlogDto{
    @IsString()
    title:string

    @IsString()
    content:string

    @IsString()
    date:Date

    @IsString()
    image:string
}