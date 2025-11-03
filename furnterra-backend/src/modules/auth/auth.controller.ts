import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { verifyOtopDto } from './dto/verifyOTP.dto';
import { Request } from 'express';
import { Role } from 'src/common/decorators/role.decorator';
import { AdminPermission } from '../admin/admin.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
    );
  }

  @Post('login')
  async login(@Body() dto: loginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Role('owner')
  @Post('admin-user')
  async manageUserAdmin(
    @Body()
    body: {
      ownerEmail: string;
      userEmail: string;
      permissions?: AdminPermission[];
      action: 'promote' | 'update-permissions' | 'demote';
    },
  ) {
    return this.authService.UserAdmin(
      body.ownerEmail,
      body.permissions ?? [],
      body.userEmail,
      body.action,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Role('owner')
  @Get('admins')
  async getAdmins(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
    @Query('search') search: string = '',
    @Query('filters') filters: Record<string, any> = {},) {
    return this.authService.getAllAdmins(page,limit,search,filters);
  }

  @UseGuards(AuthGuard('jwt'))
  @Role('owner')
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.authService.getAdminById(id);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('verify-otp')
  async verifyOTP(@Body() dto: verifyOtopDto) {
    return this.authService.verifyOTP(dto.email, dto.otp);
  }

  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }
}
