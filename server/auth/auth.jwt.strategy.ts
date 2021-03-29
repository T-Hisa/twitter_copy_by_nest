import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { jwtConstants } from './auth.constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyJwt) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('payload is ', payload)
    return { _id: payload.sub };
  }
}
