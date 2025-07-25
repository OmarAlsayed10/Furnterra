import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { verifyOtopDto } from './dto/verifyOTP.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("register")
    async register (@Body() dto:RegisterDto){
        return this.authService.register(dto.email,dto.password,dto.firstName,dto.lastName)
    }

    @Post("login")
    async login(@Body() dto:loginDto){
        const user = await this.authService.validateUser(dto.email,dto.password)
        return this.authService.login(user)
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth(){}

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleAuthRedirect(@Req() req: any){
        return this.authService.login(req.user)
    }

    @Post('verify-otp')
    async verifyOTP(@Body() dto:verifyOtopDto){
        return this.authService.verifyOTP(dto.email,dto.otp)
    }

    @Post('resend-otp')
    async resendOtp(@Body('email') email:string){
        return this.authService.resendOtp(email)
    }
}
