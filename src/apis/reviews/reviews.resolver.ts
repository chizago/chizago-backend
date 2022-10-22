import { Query, Resolver } from '@nestjs/graphql';
import { Review } from './entities/reivew.entity';
import { ReviewsService } from './reviews.service';

@Resolver()
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService, //
  ) {}
  @Query(() => [Review])
  fetchReview() {
    return this.reviewsService.find();
  }
}
