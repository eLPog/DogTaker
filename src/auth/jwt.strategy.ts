import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtAccess } from '../config/authConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAccess,
    });
  }

  async validate(payload: any) {
    return {
      userID: payload.sub,
      username: payload.username,
      city: payload.city,
      email: payload.email,
    };
  }
}
