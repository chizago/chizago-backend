import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MatchStyle } from './entities/matchStyle.entity';
import { MatchStylesService } from './matchStyles.service';

@Resolver()
export class MatchStylesResolver {
  constructor(
    private readonly matchStylesService: MatchStylesService, //
  ) {}

  @Mutation(() => MatchStyle)
  createMatchStyle(
    @Args('matchStyleName') matchStyleName: string, //
    @Args('player') player: number,
  ) {
    return this.matchStylesService.create(matchStyleName, player);
  }
}
