import {
  RateLimitVerify,
  METHOD_RATE_LIMIT_KEY,
} from './methods/rate.limit.decorator';

/**方法装饰器 */
export const MethodDecorators = [
  {key: METHOD_RATE_LIMIT_KEY, fn: RateLimitVerify},
];
