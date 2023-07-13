import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '@src/auth/guards/local-auth.guard';
import { UsersService } from '@src/users/services/users.service';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { AuthService } from '@src/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<boolean> {
    console.log(req.user);
    const toke = this.authService.login(req.user);
    return false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async auth(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: RegistrationUserDto) {
    const user = await this.authService.registerUser(body);
    return { message: 'User registered successfully', user };
  }

  // @UseGuards(LocalAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    // console.log(req);
    // req.logOut();
    return { message: 'Logged out successfully' };
  }
}
