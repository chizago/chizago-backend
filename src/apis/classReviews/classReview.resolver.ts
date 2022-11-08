import { Resolver } from '@nestjs/graphql';
import { ClassReviewService } from './classReview.service';

@Resolver()
export class ClassReviewResolver {
  constructor(
    private readonly classReviewService: ClassReviewService, //
  ) {}
}
