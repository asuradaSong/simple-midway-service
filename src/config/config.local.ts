import { MidwayConfig } from '@midwayjs/core';
import { createRedisStore } from '@midwayjs/cache-manager';
import { uploadWhiteList } from '@midwayjs/upload';
import { resolve } from 'path';

const filePath = resolve(process.cwd(), './');
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1708571815781_9434',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
  },
  /** Security 安全 https://www.midwayjs.org/docs/extensions/security */
  security: {
    csrf: {
      enable: true,
      type: 'referer',
      // 允许调用的域名地址的，例如：http://192.168.56.101/
      refererWhiteList: [
        'localhost:7001',
        '127.0.0.1:7001',
        // '192.168.220.147:7001',
      ],
    },
    xframe: {
      enable: true,
      value: 'SAMEORIGIN',
    },
    csp: {
      enable: true,
    },
    hsts: {
      enable: false,
      maxAge: 365 * 24 * 3600,
      includeSubdomains: false,
    },
    noopen: {
      enable: false,
    },
    nosniff: {
      enable: false,
    },
    xssProtection: {
      enable: true,
      value: '1; mode=block',
    },
  },
  /** TypeORM 数据源 http://www.midwayjs.org/docs/extensions/orm */
  typeorm: {
    dataSource: {
      // 默认数据库实例
      default: {
        /** 数据库类型 */
        type: 'mysql',
        /** 数据库IP */
        host: '127.0.0.1',
        /** 数据库端口 */
        port: 3306,
        /** 数据库帐号 */
        username: 'root',
        /** 数据库密码 */
        password: '940124sc',
        // password: '1234',
        /**数据库名称 */
        database: 'sevice_db',
        /** 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失 */
        synchronize: false,
        /**输出sql日志 */
        logging: false,
        /** 是否开启缓存 */
        cache: true,
        /** 数据库时区 */
        timezone: '+08:00',
        /** 数据库日期格式化成字符串 */
        dateStrings: true,
        /** 字符集 */
        charset: 'utf8mb4',
        /** 配置实体模型以扫描形式 */
        entities: ['modules/*/entity/*.entity{.ts,.js}'],
      },
    },
  },
  /** CacheManager 缓存 https://www.midwayjs.org/docs/extensions/caching */
  cacheManager: {
    clients: {
      default: {
        store: createRedisStore('default'),
        options: {
          max: 100,
          ttl: -1,
        },
      },
      captcha: {
        store: createRedisStore('default'),
        options: {
          max: 100,
          ttl: -1,
        },
      }
    },
  },
  /** Upload 文件上传 https://www.midwayjs.org/docs/extensions/upload  */
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList,
    // tmpdir: string，上传的文件临时存储路径
    // join(tmpdir(), 'midway-upload-files')
    tmpdir: `${filePath}/temp`,
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },

  /** Redis 缓存数据 http://www.midwayjs.org/docs/extensions/redis */
  redis: {
    clients: {
      default: {
        port: 6379,
        host: '127.0.0.1',
        // password: '1234',
        db: 0,
      },
    },
  },
  /** Logger 程序日志 http://www.midwayjs.org/docs/logger#配置日志根目录 */
  midwayLogger: {
    default: {
      dir: `${filePath}/logs`,
    },
  },
  /** Swagger 接口文档 http://www.midwayjs.org/docs/extensions/swagger */
  swagger: {
    title: 'RESRful API Service',
    description: 'swagger-ui document',
    termsOfService: 'https://example.com/terms/',
    version: '1.0.0',
    // servers: [
    //   {
    //     url: "http://127.0.0.1:7001/",
    //     description: "Local server",
    //   },
    // ],
    contact: {
      name: 'midwayjs',
      url: 'https://www.midwayjs.org/',
      email: 'admin@midwayjs.org',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    auth: {
      authType: 'bearer',
    },
  },
  /** JWT  JSON Web Token  https://www.midwayjs.org/docs/extensions/jwt */
  jwt: {
    /**令牌算法 */
    algorithm: 'HS512',
    /**令牌密钥 */
    secret: 'abcdefghijklmnopqrstuvwxyz', // fs.readFileSync('xxxxx.key')
    /**令牌有效期（默认120分钟） */
    expiresIn: '2d',
    /** 忽略令牌鉴权正则路由白名单 */
    whiteList: [
      /^\/$/,
      /^\/swagger-ui/,
      /^\/favicon/,
      /^\/auth\/captcha/,
      /^\/auth\/login/,
    ],
    /** 令牌刷新有效期，相差不足xx分钟，自动刷新缓存 */
    refreshIn: '20',
  },
  /** Captcha 验证码 https://www.midwayjs.org/docs/extensions/captcha */
  captcha: {
    image: {
      /**干扰线条的数量 默认 1 条 */
      noise: 4,
    },
    // 过期时间
    expirationTime: 2 * 60,
  },
} as MidwayConfig;
