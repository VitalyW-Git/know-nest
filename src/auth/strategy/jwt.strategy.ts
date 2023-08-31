import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';

const extractJwtFromCookie: JwtFromRequestFunction = request => {
  console.log('extractJwtFromCookie', request.signedCookies['token']);
  return request.signedCookies['token']!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // private readonly logger = new Logger(JwtStrategy.name);
  constructor(private readonly usersService: UsersService) {
    console.log('JwtStrategy constructor');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: '514d1dd4ccdd1',
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('JwtStrategy validate', payload);
    const user = await this.usersService.findOne(payload);
    console.log('JwtStrategy user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }

}
