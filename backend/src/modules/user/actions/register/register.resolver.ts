import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './register.input';
import { RegisterService } from './register.service';
import { RegisterResponse } from './responses';

@Resolver()
export class RegisterResolver {
  constructor(
    @Inject(RegisterService) private readonly registerService: RegisterService,
  ) {}

  @Mutation((returns) => RegisterResponse)
  async register(
    @Args('input') input: RegisterInput,
  ): Promise<typeof RegisterResponse> {
    return this.registerService.register(input);
  }
}
