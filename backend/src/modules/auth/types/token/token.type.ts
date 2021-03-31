import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IToken } from "./token.interface";

@ObjectType()
export class TokenType implements IToken {
  @Field()
  token: string;

  @Field(type => Int)
  expiresIn: number;
}
