import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * rout контроллера
 */
@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  /**
   * rout action
   */
  @Get('/product')
  getHello(): string {
    return this.appService.getHello();
  }
}
