/**
 * 模块配置
 */
export interface ModuleConfig {
  /** 名称 */
  name: string;
  /** 描述 */
  description: string;
}

/**扩展 midwayjs/redis 声明自定义脚本命令  */
declare module '@midwayjs/redis' {
  interface RedisService {
    /**
     * 限流Lua命令
     * @param key 限流缓存key
     * @param time 限流时间,单位秒
     * @param count 限流次数
     */
    rateLimitCommand(key: string, time: number, count: number): Promise<number>;
  }
}
