import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from '@src/auth/guard/local.guard';
import { AuthService } from '@src/auth/service/auth.service';
import { UserService } from '@src/users/services/user.service';
import { RegistrationUserDto, LoginUserDto } from '@src/users/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegistrationUserDto) {
    console.log('registerUser', user);
    return await this.userService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginUserDto) {
    console.log('LoginUserDto', user);
    console.log('loginUser session', req);
    return req.session;
  }
}
