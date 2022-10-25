import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './dto/createLesson.input';
import { Lesson } from './entites/lesson.entity';
import { LessonsService } from './lessons.service';

/**
 * Lesson GraphQL API Resolver
 * @APIs
 * 'createLesson',
 */

@Resolver()
export class LessonsResolver {
  constructor(
    private readonly lessonsService: LessonsService,

    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  /** 클래스 생성 */
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Lesson)
  async createLesson(
    @Context() context: IContext,
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    const user = context.req.user.email;
    return await this.lessonsService.create({ user, createLessonInput });
  }
}
