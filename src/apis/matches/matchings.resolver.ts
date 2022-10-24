import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateMatchInput } from './dto/createMatch.input';
import { Match } from './entities/match.entity';
import { MatchesService } from './matchings.service';

@Resolver()
export class MatchesResolver {
  constructor(private readonly matchesService: MatchesService) {}

  @Query(() => [Match])
  fetchMatch(
    @Args('matchId') matchId: string, //
  ) {
    //
  }

  // @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Match)
  createMatch(
    @Args('createMatchInput') createMatchInput: CreateMatchInput,
    @Args('email') email: string,
    // @Context() context: IContext,
  ) {
    //나중에 user findOne이 생기면 그거 활용하여 user 가져가기
    //새로운 매칭 생성
    return this.matchesService.create(
      createMatchInput,
      email,
      //context.req.user.email,
    );
  }
}
