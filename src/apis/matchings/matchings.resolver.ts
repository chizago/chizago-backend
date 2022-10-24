import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateMatchingInput } from './dto/createMatching.input';
import { Matching } from './entities/matching.entity';
import { MatchingsService } from './matchings.service';

@Resolver()
export class MatchingsResolver {
  constructor(private readonly matchingsService: MatchingsService) {}

  @Query(() => String)
  fetchHello() {
    return 'Hello';
  }

  // @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Matching)
  createMatch(
    @Args('createMatchingInput') createMatchingInput: CreateMatchingInput,
    @Args('email') email: string,
    // @Context() context: IContext,
  ) {
    //나중에 user findOne이 생기면 그거 활용하여 user 가져가기
    //새로운 매칭 생성
    return this.matchingsService.create(
      createMatchingInput,
      email,
      //context.req.user.email,
    );
  }
}
