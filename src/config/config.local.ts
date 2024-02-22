import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1708571815781_9434',
  koa: {
    port: 7001,
  },
  /**TypeORM 数据源 http://www.midwayjs.org/docs/extensions/orm */
  typeorm: {
    dataSource: {
      // 默认数据库实例
      default: {
        /** 数据库类型 */
        type: "mysql",
        /** 数据库IP */
        host: "127.0.0.1",
        /** 数据库端口 */
        port: 3306,
        /** 数据库帐号 */
        username: "root",
        /** 数据库密码 */
        // password: '940124sc',
        password: "1234",
        /**数据库名称 */
        database: "sevice_db",
        /** 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失 */
        synchronize: false,
        /**输出sql日志 */
        logging: false,
        /** 是否开启缓存 */
        cache: true,
        /** 数据库时区 */
        timezone: "+08:00",
        /** 数据库日期格式化成字符串 */
        dateStrings: true,
        /** 字符集 */
        charset: "utf8mb4",
        /** 配置实体模型以扫描形式 */
        entities: ["modules/*/model/*.entity{.ts,.js}"],
      },
    },
  },
  /** swagger 接口文档 http://www.midwayjs.org/docs/extensions/swagger */
  swagger: {
    title: "RESRful API Service",
    description: "swagger-ui document",
    termsOfService: "https://example.com/terms/",
    version: "1.0.0",
    servers: [
      {
        url: "http://127.0.0.1:7001/",
        description: "Local server",
      },
    ],
    contact: {
      name: "midwayjs",
      url: "https://www.midwayjs.org/",
      email: "admin@midwayjs.org",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    auth: {
      authType: "bearer",
    },
  },
} as MidwayConfig;
