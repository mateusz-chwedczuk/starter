import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseResponse {
  @Field()
  className: string = this.constructor.name;
}
