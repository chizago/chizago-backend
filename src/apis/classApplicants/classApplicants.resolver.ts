import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { ClassApplicantsService } from './classApplicants.service';
import { CreateClassApplicantInput } from './dto/classApplicant.input';
import { ClassApplicant } from './entities/classApplicant.entity';

/**
 * ClassApplicant GraphQL API Resolver
 * @APIs
 * 'applyLesson',
 */

@Resolver()
export class ClassApplicantsResolver {
  constructor(
    private readonly classApplicantsService: ClassApplicantsService, //
  ) {}

  /** 카페 예약하기 */
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ClassApplicant)
  applyLesson(
    @Args('createReservationInput')
    createClassApplicantInput: CreateClassApplicantInput,
    @Context() context: IContext,
  ) {
    return this.classApplicantsService.create({
      createClassApplicantInput,
      context,
    });
  }
}
