import {Provide, Inject, Config, ILogger, httpError} from '@midwayjs/core';
import {JwtService} from '@midwayjs/jwt';
import {CaptchaService} from '@midwayjs/captcha';
import {ImageCaptcha, LoginToken } from "../vo/authorization.vo";

@Provide()
export class AuthorizationService {
  @Inject()
  captchaService: CaptchaService;
  @Inject()
  jwtService: JwtService;
  @Inject()
  logger: ILogger;

  @Config('captcha.default')
  captchaConfig: { width: number; height: number };

  /**
   * 获取验证码
   * @param options 验证码参数
   * @returns 图片验证码
   */
  async captcha(options: { width?: number; height?: number }) {
    const {id: captchaId, imageBase64: captcha} =
      await this.captchaService.image({
        width: options.width || this.captchaConfig.width,
        height: options.height || this.captchaConfig.height,
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
    if (!isCorrect) {
      throw new httpError.BadRequestError("验证码错误!")
    }
     const loginResult = new LoginToken();
    loginResult.setAccessToken('sdfsdfsdfsd');
    return loginResult;

  }
}
