import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[A-Z]).*$/)
  @Matches(/^(?=.*[\d]).*$/)
  @Matches(/^(?=.*[^\p{L}\d\s]).*$/u)
  password: string;
}
