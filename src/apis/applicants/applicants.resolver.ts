import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './entities/applicant.entity';

@Resolver()
export class ApplicantsResolver {
  constructor(
    private readonly applicantsService: ApplicantsService, //
  ) {}

  @Mutation(() => [Applicant])
  fetchApplicants(
    @Args('matchId') matchId: string, //
  ) {
    return this.applicantsService.findAllByMatch(matchId);
  }
}
