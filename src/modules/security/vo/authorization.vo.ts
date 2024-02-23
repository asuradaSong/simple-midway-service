import {ApiProperty} from '@midwayjs/swagger';
import {SuccessWrapper} from '../../../util/Result';

export class ImageCaptcha {
  @ApiProperty({
    description: '验证码',
  })
  captha: string;
  @ApiProperty({
    description: '验证码ID',
  })
  capthaId: string;

  setCaptha(captha: string) {
    this.captha = captha;
  }

  setCapthaId(capthaId: string) {
    this.capthaId = capthaId;
  }
}

export class ImageCaptchaVo extends SuccessWrapper(ImageCaptcha) {
}


export class LoginToken {
  @ApiProperty({description: '用户唯一身份令牌'})
  access_token: string;
  setAccessToken(token: string) {
    this.access_token = token
  }
}

export class LoginTokenVo extends SuccessWrapper(LoginToken) {
}
