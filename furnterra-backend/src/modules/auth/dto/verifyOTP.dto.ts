import { IsEmail, IsString } from "class-validator";

export class verifyOtopDto{
    @IsEmail()
    email:string

    @IsString(  )
    otp:string
}