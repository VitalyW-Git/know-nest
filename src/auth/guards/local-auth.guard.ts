import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    console.log('LocalAuthGuard', result)
    if (context.getType() === 'http') {
      console.log('LocalAuthGuard 1');
      const request = context.switchToHttp().getRequest();
      console.log('LocalAuthGuard 2');
      console.log('LocalAuthGuard 3', request);
      console.log('LocalAuthGuard 4');
      console.log(super.logIn(request));
    }
    console.log('LocalAuthGuard non')
    return result;
  }
}
