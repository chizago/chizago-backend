import { Resolver } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';

@Resolver()
export class ApplicantsResolver {
  constructor(private readonly applicantsService: ApplicantsService) {}
}
