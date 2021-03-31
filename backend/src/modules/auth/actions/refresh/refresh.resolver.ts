import { Inject, UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators/current-user-provider.decorator';
import { GqlGuard } from '../../guards/gql.guard';
import { ICurrentUser } from '../../types/current-user.interface';
import { RefreshService } from './refresh.service';
import { RefreshResponse } from './responses';

@Resolver()
export class RefreshResolver {
  constructor(
    @Inject(RefreshService.name)
    private readonly refreshService: RefreshService,
  ) {}

  @Mutation((returns) => RefreshResponse)
  @UseGuards(GqlGuard)
  async refresh(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<typeof RefreshResponse> {
    return this.refreshService.refresh(currentUser);
  }
}
