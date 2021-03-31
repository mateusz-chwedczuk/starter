import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../../../shared/graphql/base-response';
import { IToken } from '../../types/token/token.interface';

@ObjectType()
export class RefreshOkResponse extends BaseResponse implements IToken {
  @Field()
  token: string;

  @Field((type) => Int)
  expiresIn: number;

  constructor(tokenInfo: IToken) {
    super();
    this.token = tokenInfo.token;
    this.expiresIn = tokenInfo.expiresIn;
  }
}

@ObjectType()
export class RefreshInvalidResponse extends BaseResponse {}

export const RefreshResponse = createUnionType({
  name: 'RefreshResponse',
  types: () => [RefreshOkResponse, RefreshInvalidResponse],
});
