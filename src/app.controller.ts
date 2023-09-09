import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from '@src/auth/guard/admin.guard';
import { UserGuard } from '@src/auth/guard/user.guard';

import { AppService } from '@src/app.service';
import { LoggedInGuard } from '@src/auth/guard/logged-in.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  publicRoute() {
    return this.appService.getPublicMessage();
  }

  @UseGuards(LoggedInGuard)
  @Get('protected')
  guardedRoute() {
    return this.appService.getPrivateMessage();
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage();
  }

  @UseGuards(UserGuard)
  @Get('user')
  getUserMessage(@Req() req) {
    return req.user;
  }
}
