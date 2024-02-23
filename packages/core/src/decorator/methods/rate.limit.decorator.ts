import {createCustomMethodDecorator, REQUEST_OBJ_CTX_KEY, JoinPoint} from "@midwayjs/core";
import {LimitTypeEnum} from "../../enum/limit.type.enum";
// import {RedisCacheService} from "../../service/redis.service";
// /** 限流参数 */
interface rateLimitOptions {
  // /** 资源名称，用于描述接口功能*/
  // name: string;
  // /** 资源 key */
  // key: string;
  // /** key prefix */
  // prefix: string;
  /**限流时间,单位秒 */
  period: number;
  /**限流次数 */
  count: number;
  /**限流条件类型 */
  limitType?: LimitTypeEnum;
}


/**装饰器key标识-请求限流 */
export const METHOD_RATE_LIMIT_KEY = 'decorator:rate_limit_key';

/**
 * 装饰器声明-请求限流
 *
 * 示例参数：`{ key: 'user', period: 5, count: 10, name: 'userLimit', prefix: 'limit' }`
 *
 * 参数表示：5秒内，最多请求10次，类型记录IP
 *
 * 使用 `LimitTypeEnum.USER` 时，请在用户身份授权认证校验后使用
 * 以便获取登录用户信息，无用户信息时默认为 `LimitTypeEnum.GLOBAL`
 * @param options 限流参数
 */
export function RateLimit(options: rateLimitOptions): MethodDecorator {
  return createCustomMethodDecorator(METHOD_RATE_LIMIT_KEY, options);
}

/**
 * 实现装饰器-请求限流
 *
 * @param options.metadata 方法装饰器参数
 * @returns 返回结果
 */
export function RateLimitVerify(options: { metadata: rateLimitOptions }) {
  return {
    around: async (joinPoint: JoinPoint) => {
      // 装饰器所在的实例上下文
      const ctx = joinPoint.target[REQUEST_OBJ_CTX_KEY];
      const limitCount = options.metadata.count;
      // const limitTime = options.metadata.period;
      // const combinedKey = '';
      // ctx.logger.info(
      //   `第${rateCount}次访问key为 ${combinedKey}，描述为 [${name}] 的接口`
      // );

      // 在Redis查询并记录请求次数
      // const redisCacheService = await ctx.requestContext.getAsync(
      //   RedisCacheService
      // );
      // const rateCount = await redisCacheService.rateLimit(
      //   combinedKey,
      //   limitTime,
      //   limitCount
      // );
      // const rateTime = await redisCacheService.getExpire(combinedKey);
      // 设置限流声明响应头
      ctx.set('X-Ratelimit-Limit', `${limitCount}`);
      // ctx.set('X-Ratelimit-Remaining', `${limitCount - rateCount}`);
      // ctx.set('X-Ratelimit-Reset', `${Date.now() + rateTime * 1000}`);
      // if (rateCount >= limitCount) {
      //   return new httpError.ForbiddenError('访问过于频繁，请稍候再试')
      // }
      // 执行原方法
      return await joinPoint.proceed(...joinPoint.args);
    }
  }
}
