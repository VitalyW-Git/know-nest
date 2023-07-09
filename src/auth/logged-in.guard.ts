import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
