import {Middleware, IMiddleware, Config, httpError} from '@midwayjs/core';
import {NextFunction, Context} from '@midwayjs/koa';
import {TOKEN_KEY} from "../constant/token.constant";

@Middleware()
export class SecurityMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('jwt.whiteList')
  private whiteList: RegExp[];

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers[TOKEN_KEY]) {
        throw new httpError.UnauthorizedError('未授权');
      }
      // 从 header 上获取校验信息
      const parts: string[] = ctx.get(TOKEN_KEY).trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError('未授权');
      }
      const [scheme, token]: string[] = parts;
      console.log(token)
      if (/^Bearer$/i.test(scheme)) {
        await next();
      }
    }

  }

  public static getName(): string {
    return 'security';
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    return this.whiteList.some(item => item.test(ctx.path))
  }
}
