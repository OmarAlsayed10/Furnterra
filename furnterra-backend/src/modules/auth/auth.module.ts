import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { googleStrategy } from './strategies/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { PendingUserModule } from './pending-user/pending-user.module';

@Module({
  imports:[UsersModule,PassportModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async(configService:ConfigService)=>({
      secret:configService.get<string>("JWT_SECRET"),
      signOptions:{expiresIn:"1d"},
    }),
    inject:[ConfigService]
  }), AdminModule, PendingUserModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,googleStrategy],
  exports:[AuthService]
})
export class AuthModule {}
