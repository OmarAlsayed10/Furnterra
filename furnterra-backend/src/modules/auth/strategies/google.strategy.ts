import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,VerifyCallBack} from "passport-google-oauth20"
import { AuthService } from "../auth.service";

@Injectable()

export class googleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(private authService:AuthService){
        super({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:process.env.GOOGLE_CALLBACK_URL,
            scope:['email','profile']
        })
    }

    async validate(
        accessToken:string,
        refreshToken:string,
        profile:any,
        done:VerifyCallBack,

    ):Promise<any>{
        const user = await this.authService.googleLogin(profile)
        done(null,user)
    }
}