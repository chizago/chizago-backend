import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLessonInput } from './createLesson.input';

@InputType()
export class UpdateLessonInput extends PartialType(CreateLessonInput) {}
