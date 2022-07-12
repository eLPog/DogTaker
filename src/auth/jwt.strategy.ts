import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtAccess } from '../config/authConfig';
import { Request } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtAccess,
      jwtFromRequest: ExtractJwt.fromExtractors([
        // @ts-ignore
        (request: Request) => {
          // @ts-ignore
          const data = request?.cookies['jwt'];
          // @ts-ignore
          console.log(request.cookies);
          console.log(data);
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.userID,
      email: payload.email,
      role: payload.role,
    };
  }
}
