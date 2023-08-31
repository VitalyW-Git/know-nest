import { Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
// import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisStrategy extends PassportStrategy(Strategy, 'redis') {
  // constructor(private readonly redisService: RedisService) {
  //   super();
  // }

  async validate(@Request() req): Promise<any> {
    console.log(req);
    // 注意，passport的session数据结构，使用req.session.passport.user来访问 user session
    // const { passport: { user } } = req.session;
    console.log(req.session);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // 这里的userId和username是上面local.strategy在调用login()函数的时候，passport添加到session中的。
    // 数据结构保持一致即可
    // const { id, username } = user;
    return true;
  }
}