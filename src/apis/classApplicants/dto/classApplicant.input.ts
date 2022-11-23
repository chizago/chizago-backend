import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassApplicantInput {
  @Field(() => String)
  applyDate: string;

  @Field(() => String)
  lessonId: string;
}
