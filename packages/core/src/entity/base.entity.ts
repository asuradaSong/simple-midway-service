import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './typeorm.entity';
export class BaseEntity extends BaseModel {
  @PrimaryGeneratedColumn('increment', {
    comment: '主键ID',
  })
  id: number;
  @Column({
    comment: '创建人',
  })
  create_by: string;

  @Column({
    comment: '更新人',
  })
  update_by: string;

  @Index()
  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;

  @Index()
  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_time: Date;
}
