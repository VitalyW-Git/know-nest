import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // private readonly logger = new Logger(JwtStrategy.name);
  constructor(private readonly usersService: UsersService) {
    console.log(process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('JwtStrategy', payload);
    const user = await this.usersService.findOne(payload.id);
    if (user) {
      throw new UnauthorizedException();
    }
    return { id: payload.id, username: payload.username };
  }
}
