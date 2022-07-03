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
      username: payload.name,
      sub: payload.userID,
      email: payload.email,
      numberOfWalks: payload.numberOfWalks,
      description: payload.description,
    };
  }
}
