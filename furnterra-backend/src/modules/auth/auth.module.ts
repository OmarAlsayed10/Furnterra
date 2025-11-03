import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { googleStrategy } from './strategies/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PendingUserModule } from './pending-user/pending-user.module';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { UserSchema } from '../users/user.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PassportModule, JwtModule.registerAsync({

    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "1d" },
    }),
    inject: [ConfigService]
  }), PendingUserModule],
  controllers: [AuthController],
  providers: [JwtStrategy, googleStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
