import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    // Payload vem do token, pode retornar dados que ficarão em req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
