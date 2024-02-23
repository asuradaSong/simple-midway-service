import {Configuration, App} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as swagger from '@midwayjs/swagger';
import * as redis from '@midwayjs/redis';
import * as jwt from '@midwayjs/jwt';
import * as staticFile from '@midwayjs/static-file';
import * as orm from '@midwayjs/typeorm';
import * as security from '@midwayjs/security';
import * as captcha from '@midwayjs/captcha';
import * as cacheManager from '@midwayjs/cache-manager';
import * as info from '@midwayjs/info';
import * as simple from '@simple-midway/core';

// import * as crossDomain from '@midwayjs/cross-domain';
import {join} from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import {ReportMiddleware} from './middleware/report.middleware';

@Configuration({
  imports: [
    // 导入 koa 组件
    koa,
    // // 导入跨域 crossDomain 组件
    // crossDomain,
    // 导入参数验证组件
    validate,
    // 导入数据库 ORM 组件
    orm,
    // 导入缓存管理组件
    cacheManager,
    // 导入redis 组件
    redis,
    // 导入 验证码 组件
    captcha,
    // 导入 jsonwebtoken 组件
    jwt,
    // 导入 swagger 组件
    swagger,
    // 导入安全 security 组件
    security,
    // 导入静态文件映射 staticFile 组件
    staticFile,
    // 导入 simple 核心组件
    simple,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

  }
}
