import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @Rule(RuleType.string().required())
  username: string;

  @ApiProperty({
    description: '密码',
  })
  @Rule(RuleType.string().required())
  password: string;

  @ApiProperty({
    description: '验证码',
  })
  @Rule(RuleType.string().required())
  captcha: string;

  @ApiProperty({
    description: '验证码ID',
  })
  @Rule(RuleType.string().required())
  captchaId: string;
}
