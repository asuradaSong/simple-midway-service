import {
  App,
  Configuration,
  Logger,
  Inject,
  ILifeCycle,
  ILogger,
  IMidwayContainer,
  MidwayDecoratorService,
} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as redis from '@midwayjs/redis';
import DefaultConfig from './config/config.default';
import {SimpleModuleConfig} from './module/config';
import {MethodDecorators} from "./decorator";

@Configuration({
  namespace: 'simple',
  imports: [
    // 导入redis 组件
    redis
  ],
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class SimpleConfiguration implements ILifeCycle {
  @Logger('coreLogger')
  coreLogger: ILogger;
  @App()
  app: koa.Application;
  @Inject()
  decoratorService: MidwayDecoratorService;

  async onReady(container: IMidwayContainer) {
    // 处理模块配置
    await container.getAsync(SimpleModuleConfig);
    // add 注册方法装饰器
    for (const {key, fn} of MethodDecorators) {
      this.decoratorService.registerMethodHandler(key, fn);
    }
    this.coreLogger.info('\x1B[36m [simple:core] core starter \x1B[0m');
  }

  async onConfigLoad() {
  }

  async onServerReady() {
  }
}
