import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context);
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(context.switchToHttp().getRequest());
    return result;
  }
}