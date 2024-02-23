import { Provide } from '@midwayjs/decorator';

/**
 * 控制器基类
 * */
@Provide()
export abstract class BaseController {
  /**
   * 成功返回
   * @param data 返回数据
   * @param message 消息
   */
  ok(data?: any, message?: string) {
    return { code: 200, message: message || 'success', data };
  }
}
