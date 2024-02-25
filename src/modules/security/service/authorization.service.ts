import {Provide, Inject, Config, ILogger, httpError, InjectClient} from '@midwayjs/core';
import {JwtService} from '@midwayjs/jwt';
import {CaptchaService} from '@midwayjs/captcha';
import {InjectEntityModel} from "@midwayjs/typeorm";
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import {Repository} from "typeorm";
import {BaseService} from "@simple-midway/core";
import {User} from "../../system/entity/user.entity";
import {ImageCaptcha, LoginToken} from "../vo/authorization.vo";

@Provide()
export class AuthorizationService extends BaseService<User> {

  @Inject()
  captchaService: CaptchaService;

  @InjectEntityModel(User)
  model: Repository<User>;

  getModel(): Repository<User> {
    return this.model;
  }

  @Inject()
  jwtService: JwtService;

  @Inject()
  logger: ILogger;

  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache;

  @Config('captcha')
  captchaConfig: { default: { width: number; height: number }, idPrefix: string };


  /**
   * 获取验证码
   * @param options 验证码参数
   * @returns 图片验证码
   */
  async captcha(options: { width?: number; height?: number }) {
    const {id: captchaId, imageBase64: captcha} =
      await this.captchaService.image({
        width: options.width || this.captchaConfig.default.width,
        height: options.height || this.captchaConfig.default.height,
      });
    const captchaResult = new ImageCaptcha();
    // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    captchaResult.setCaptha(captcha);
    // 验证码 id
    captchaResult.setCapthaId(captchaId)
    return captchaResult;
  }

  /**
   * 用户登录
   * @param options 登录参数
   * @returns 用户唯一身份令牌
   */
  async login(options: {
    captchaId: string;
    captcha: string;
    username: string;
    password: string;
  }) {
    const isCorrect: boolean = await this.captchaService.check(
      options.captchaId,
      options.captcha
    )
    // 清除缓存中的验证码
   await this.cache.del(`${this.captchaConfig.idPrefix}:${options.captchaId}`);

    if (!isCorrect) {
      throw new httpError.BadRequestError("验证码错误或者已过期!")
    }

    // const user = await this.model.findOneBy({username: options.username});
    //  if (user) {
    //
    //  }
    const loginResult = new LoginToken();
    loginResult.setAccessToken('sdfsdfsdfsd');
    return loginResult;

  }
}
