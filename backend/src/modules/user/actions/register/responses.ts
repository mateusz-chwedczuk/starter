import { createUnionType, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../../../shared/graphql/base-response';

@ObjectType()
export class RegisterOkResponse extends BaseResponse {}

@ObjectType()
export class RegisterEmailTakenResponse extends BaseResponse {}

export const RegisterResponse = createUnionType({
  name: 'RegisterResponse',
  types: () => [RegisterOkResponse, RegisterEmailTakenResponse],
});
