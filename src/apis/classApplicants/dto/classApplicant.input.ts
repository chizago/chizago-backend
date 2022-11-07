import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassApplicantInput {
  @Field(() => Date)
  applyDate: Date;

  @Field(() => String)
  lessonId: string;
}
