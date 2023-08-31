import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, HttpCode, HttpStatus } from "@nestjs/common";
import { Request } from 'express';
import { LocalAuthGuard } from '@src/auth/guards/local-auth.guard';
import { UsersService } from '@src/users/services/users.service';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { AuthService } from '@src/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TokenInterceptor } from "@src/auth/interceptors/token.interceptor";
import { AuthenticatedGuard } from "@src/auth/guards/authenticated.guard";
import { JwtAuthGuard } from "@src/auth/guards/jwt-auth.guard";
import { AuthUser } from "@src/users/decorator/user.decorator";
import { RedisStrategy } from "@src/auth/strategy/redis.strategy";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}


  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('local'))
  @UseInterceptors(TokenInterceptor)
  // async login(@Req() req: Request): Promise<boolean> {
  //   const toke = await this.authService.login(req.user);
  //   console.log('Controller login', toke);
  //   return false;
  // }
  async login(@AuthUser() user: any): Promise<any> {
    return user;
  }

  @Post('auth')
  @UseGuards(JwtAuthGuard)
  async auth(@Req() req: Request): Promise<any> {
  // async auth(@AuthUser() user: any): Promise<any> {
    return req.user;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegistrationUserDto) {
    const user = await this.authService.registerUser(body);
    return { message: 'User registered successfully', user };
  }

  // @UseGuards(AuthGuard('redis'))
  @Post('authenticated')
  @UseGuards(AuthenticatedGuard)
  // @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthGuard('applySession'))
  async authenticated(@Req() req: Request) {
    return req.user;
  }
}
