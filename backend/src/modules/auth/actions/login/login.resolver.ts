import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './login.input';
import { LoginService } from './login.service';
import { LoginResponse } from './responses';

@Resolver()
export class LoginResolver {
  constructor(
    @Inject(LoginService.name) private readonly loginService: LoginService,
  ) {}

  @Mutation((returns) => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<typeof LoginResponse> {
    return this.loginService.login(input);
  }
}
