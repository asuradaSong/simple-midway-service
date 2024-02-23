import {Inject, Controller, Get, Query, Post, Body, Context } from '@midwayjs/core';
import {ApiOkResponse} from '@midwayjs/swagger';
import {Validate} from '@midwayjs/validate';
import { BaseController, RateLimit } from '@simple-midway/core';
import {AuthorizationService} from '../service/authorization.service';
import {AuthUserDto} from '../dto/authorization.dto';
import {ImageCaptchaVo, LoginTokenVo} from '../vo/authorization.vo';

@Controller('/auth', {
  description: 'Authorization Controller',
  tagName: '系统：系统授权接口',
})
export class AuthorizationController extends BaseController {
  @Inject()
  ctx: Context;

  @Inject()
  authorizationService: AuthorizationService;

  @ApiOkResponse({
    type: ImageCaptchaVo,
    description: 'OK',
  })
  @Get('/captcha', {summary: '获取验证码', description: '获取验证码'})
  async captcha(
    @Query('height') height: number,
    @Query('width') width: number
  ): Promise<ImageCaptchaVo> {
    return this.ok(await this.authorizationService.captcha({width, height}));
  }

  @ApiOkResponse({
    type: LoginTokenVo,
    description: 'OK',
  })
  @Post('/login', {summary: '登录授权', description: '用户登录'})
  @RateLimit({ period: 5, count: 10  })
  @Validate()
  async login(@Body() authUser: AuthUserDto): Promise<LoginTokenVo> {
    return this.ok(await this.authorizationService.login(authUser));
  }
}
