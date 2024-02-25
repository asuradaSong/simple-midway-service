import {Provide, Scope, ScopeEnum} from "@midwayjs/core";
import {BaseEntity} from '../entity/base.entity'
import {Repository} from "typeorm";

@Provide()
@Scope(ScopeEnum.Request, {allowDowngrade: true})
export abstract class BaseService<T extends BaseEntity> {
  abstract getModel(): Repository<T>;
}
