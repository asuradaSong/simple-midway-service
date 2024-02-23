import { ApiProperty, Type } from '@midwayjs/swagger';

export function SuccessWrapper<T extends Type>(ResourceCls: T) {
  class Successed {
    @ApiProperty({ description: '状态码' })
    code: number;

    @ApiProperty({ description: '消息' })
    message: string;

    @ApiProperty({
      type: ResourceCls,
    })
    data?: InstanceType<T>;
  }

  return Successed;
}
