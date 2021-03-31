import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlGuard } from '../auth/guards/gql.guard';
import { UserType } from './types/user.type';
import { UserService } from './user.service';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  @Query((returns) => [UserType])
  @UseGuards(GqlGuard)
  async users(): Promise<UserType[]> {
    const users = await this.userService.model.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
    }));
  }
}
