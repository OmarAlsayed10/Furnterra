import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../../modules/users/users.service';

interface jwtPayload{
    email:string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret123',
    });
  }

  async validate(payload: jwtPayload) {

    const user =await this.userService.findByEmail(payload.email)
    if(!user) return;
    
    return { userId: user._id, email: user.email, role: user.role };
  }
}
