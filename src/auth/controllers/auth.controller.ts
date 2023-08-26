import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '@src/auth/guards/local-auth.guard';
import { UsersService } from '@src/users/services/users.service';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { AuthService } from '@src/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TokenInterceptor } from "@src/auth/interceptors/token.interceptor";
import { AuthenticatedGuard } from "@src/auth/guards/authenticated.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  // @UseInterceptors(TokenInterceptor)
  async login(@Req() req: Request): Promise<boolean> {
    const toke = await this.authService.login(req.user);
    console.log(toke);
    return false;
  }

  @Post('auth')
  @UseGuards(LocalAuthGuard)
  async auth(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: RegistrationUserDto) {
    const user = await this.authService.registerUser(body);
    return { message: 'User registered successfully', user };
  }

  @Post('authenticated')
  @UseGuards(AuthenticatedGuard)
  async authenticated(@Req() req: Request) {
    return req.user;
  }
}
