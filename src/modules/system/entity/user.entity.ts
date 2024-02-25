import {BaseEntity} from "@simple-midway/core";
import {Column, Entity} from "typeorm";

/**
 * 性别枚举
 * */
export enum Gender {
  FEMALE, // 女
  MALE, // 男
  UNKNOWN // 未知
}

@Entity('sys_user')
export class User extends BaseEntity {
  @Column({
    unique: true,
    comment: '用户名'
  })
  username: string;
  @Column({
    comment: '密码'
  })
  password: string;
  @Column({
    comment: '昵称'
  })
  nick: string;
  @Column({
    comment: '邮箱'
  })
  email: string;
  @Column({

    comment: '手机号'
  })
  phone: string;
  @Column({
    comment: '性别',
    default: Gender.MALE
  })
  gender: string;
  @Column({
    comment: '头像'
  })
  avatar: string;
  @Column({
    comment: '账号是否启用',
    default: true
  })
  enable: boolean;
  @Column({
    comment: '账号是否删除',
    default: false
  })
  is_delete: boolean;
}
