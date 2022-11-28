import { ConflictException, UseGuards } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext, IElasticSearch } from 'src/commons/type/context';
import { UsersService } from '../users/user.service';
import { CreateMatchInput } from './dto/createMatch.input';
import { UpdateMatchInput } from './dto/updateMatch.input';
import { Match } from './entities/match.entity';
import { MatchesService } from './matchings.service';

@Resolver()
export class MatchesResolver {
  constructor(
    private readonly matchesService: MatchesService, //
    private readonly usersService: UsersService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Match])
  async fetchMatches(
    @Args('search') search: string, //
  ) {
    if (search) {
      const result: IElasticSearch = await this.elasticsearchService.search({
        index: 'match',
        query: {
          match: {
            title: search,
          },
        },
      });
      // console.log(JSON.stringify(result.hits.hits, null, ' '));

      //데이터 파싱 작업
      const newData = this.matchesService.parseData(result.hits.hits);
      return newData;
    }

    return this.matchesService.findAll();
  }

  @Query(() => Match)
  fetchMatch(
    @Args('matchId') matchId: string, //
  ) {
    return this.matchesService.findOne(matchId);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Match)
  async createMatch(
    @Args('createMatchInput') createMatchInput: CreateMatchInput,
    @Context() context: IContext,
  ) {
    //create할 때 이미지도 버킷에 저장하기

    //유저 찾기
    const user = await this.usersService.findOneByEmail({
      email: context.req.user.email,
    });
    if (!user) {
      throw new ConflictException('해당 유저의 정보를 찾을 수 없습니다.');
    }

    //새로운 매치 생성
    return this.matchesService.create(
      createMatchInput, //
      user,
    );
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Match)
  async updateMatch(
    @Args('matchId') matchId: string,
    @Args('updateMatchInput') updateMatchInput: UpdateMatchInput,
    @Context() context: IContext,
  ) {
    //update할 때 이미지 버킷에 저장하기

    //유저 찾기
    const user = await this.usersService.findOneByEmail({
      email: context.req.user.email,
    });
    if (!user) {
      throw new ConflictException('해당 유저의 정보를 찾을 수 없습니다.');
    }

    //해당 매치 수정
    return this.matchesService.update(matchId, updateMatchInput, user.email);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteMatch(
    @Args('matchId') matchId: string, //
    @Context() context: IContext,
  ) {
    //delete할 때 권한이 있는지 확인하기 -> user findOne 사용해서 가져오기
    //delete할 때 이미지 버킷에 저장하기

    //유저 찾기
    const user = await this.usersService.findOneByEmail({
      email: context.req.user.email,
    });
    if (!user) {
      throw new ConflictException('해당 유저의 정보를 찾을 수 없습니다.');
    }

    //매치 데이터 삭제
    const result = await this.matchesService.delete(matchId, user.email);

    //ElasticSearch 데이터 삭제
    await this.elasticsearchService.deleteByQuery({
      index: 'match',
      query: {
        match: {
          _id: matchId,
        },
      },
    });

    return result;
  }
}
