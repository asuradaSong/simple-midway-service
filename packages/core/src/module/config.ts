import {
  Provide,
  // App,
  // ALL,
  Init,
  // Config,
  Singleton,
  // IMidwayApplication,
} from '@midwayjs/core';

/**
 * 模块配置
 */
@Provide()
@Singleton()
export class SimpleModuleConfig {
  // @App()
  // app: IMidwayApplication;
  // @Config(ALL)
  // allConfig;
  // modules;
  @Init()
  async init() {}
}
