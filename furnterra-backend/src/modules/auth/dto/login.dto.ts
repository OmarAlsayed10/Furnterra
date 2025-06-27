import { IsEmail, isString, IsString } from "class-validator";

export class loginDto {

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsString()
    firstName:string;
    
    @IsString()
    lastName:string;

}