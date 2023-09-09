import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    console.log('LocalGuard', result);
    console.log('LocalGuard logIn', context.switchToHttp().getRequest());
    await super.logIn(context.switchToHttp().getRequest());
    return result;
  }
}
