import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';
import { compare } from 'bcrypt';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findOneEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return await this.authService.login(user);
  }
}
