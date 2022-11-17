import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ClassReviewService } from './classReview.service';
import { ClassReview } from './entities/classReview.entity';

@Resolver()
export class ClassReviewResolver {
  constructor(
    private readonly classReviewService: ClassReviewService, //
  ) {}

  @Query(() => [ClassReview])
  fetchReviews(
    @Args({ name: 'id', description: 'lesson uuid' }) id: string, //
  ) {
    return this.classReviewService.find({ id });
  }

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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ClassReview)
  updateReview(
    @Context() context: any, //
    @Args({ name: 'contents', description: '리뷰 내용' }) contents: string, //
    @Args({ name: 'id', description: 'lesson uuid' }) id: string,
  ) {
    const email = context.user.email;
    return this.classReviewService.update({ email, contents, id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteReview(
    @Context() context: any, //
    @Args({ name: 'id', description: 'review uuid' }) id: string,
  ) {
    const email = context.user.email;
    return this.classReviewService.delete({ email, id });
  }
}
