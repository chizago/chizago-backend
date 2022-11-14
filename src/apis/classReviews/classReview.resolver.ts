import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ClassReviewService } from './classReview.service';
import { ClassReview } from './entities/classReview.entity';

@Resolver()
export class ClassReviewResolver {
  constructor(
    private readonly classReviewService: ClassReviewService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ClassReview)
  createReview(
    @Context() context: any, //
    @Args({ name: 'contents', description: '리뷰 내용' }) contents: string, //
    @Args({ name: 'id', description: 'lesson uuid' }) id: string,
  ) {
    const email = context.req.user.email;
    return this.classReviewService.create({ id, contents, email });
  }
}
