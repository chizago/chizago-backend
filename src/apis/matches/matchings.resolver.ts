import { UseGuards } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateMatchInput } from './dto/createMatch.input';
import { UpdateMatchInput } from './dto/updateMatch.input';
import { Match } from './entities/match.entity';
import { MatchesService } from './matchings.service';

@Resolver()
export class MatchesResolver {
  constructor(
    private readonly matchesService: MatchesService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Match])
  fetchMatches() {
    // @Args('search') search: string, //
    // if (search) {
    // const result = this.elasticsearchService.search({
    //   index: 'matches',
    //   query: {
    //     match_all: {},
    //   },
    // });
    // console.log(JSON.stringify(result, null, ' '));
    // }

    return this.matchesService.findAll();
  }

  @Query(() => Match)
  fetchMatch(
    @Args('matchId') matchId: string, //
  ) {
    return this.matchesService.findOne(matchId);
  }

  // @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Match)
  createMatch(
    @Args('createMatchInput') createMatchInput: CreateMatchInput,
    @Args('email') email: string,
    // @Context() context: IContext,
  ) {
    //나중에 user findOne이 생기면 그거 활용하여 user 가져가기
    //새로운 매치 생성
    return this.matchesService.create(
      createMatchInput,
      email,
      //context.req.user.email,
    );
  }

  // @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Match)
  updateMatch(
    @Args('matchId') matchId: string,
    @Args('updateMatchInput') updateMatchInput: UpdateMatchInput,
    @Args('email') email: string,
    // @Context() context: IContext,
  ) {
    //나중에 user findone해서 작성자가 맞는 지 확인하기
    //해당 매치 수정
    return this.matchesService.update(matchId, updateMatchInput, email);
  }
}
