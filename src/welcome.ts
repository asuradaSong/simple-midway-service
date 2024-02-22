import { ApiExcludeController } from '@midwayjs/swagger';
import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
@ApiExcludeController()
@Controller('/')
export class WelcomeController {
  @Inject()
  ctx: Context;

  @Get('/', { summary: '接口文档界面' })
  public async welcome() {
    this.ctx.redirect('/swagger-ui/index.html');
  }
}
