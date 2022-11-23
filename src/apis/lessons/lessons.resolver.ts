import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateLessonInput } from './dto/createLesson.input';
import { UpdateLessonInput } from './dto/updateLesson.input';
import { Lesson } from './entites/lesson.entity';
import { LessonsService } from './lessons.service';

/**
 * Lesson GraphQL API Resolver
 * @APIs
 * 'fetchLesson',
 * 'fetchLessons',
 * 'fetchLessonsByCreatedAt',
 * 'fetchRecommendLesson',
 * 'createLesson',
 * 'updateLesson',
 * 'deleteLesson',
 */

@Resolver()
export class LessonsResolver {
  constructor(
    private readonly lessonsService: LessonsService, //
  ) {}

  /** 클래스 하나 조회 */
  @Query(() => Lesson)
  fetchLesson(
    @Args('lessonId') lessonId: string, //
  ) {
    return this.lessonsService.findOne({ lessonId });
  }

  /** 클래스 전체 조회 */
  @Query(() => [Lesson])
  async fetchLessons(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return this.lessonsService.findAll({ page });
  }

  /** 클래스 생성일 기준 조회
   * @Params page : 조회할 페이지 (ex 1, 2, 3)
   * @Params sortBy : 정렬기준 (ex ASC, DESC)
   */
  @Query(() => [Lesson])
  fetchLessonsByCreatedAt(
    @Args('page', { defaultValue: 1 }) page: number, //
    @Args('sortBy', { defaultValue: 'DESC', nullable: true }) sortBy: string,
  ) {
    return this.lessonsService.findByCreatedAt({
      page,
      sortBy,
    });
  }

  /** 클래스 찜 기준 조회
   * @Params page : 조회할 페이지 (ex 1, 2, 3)
   * @Params sortBy : 정렬기준 (ex ASC, DESC)
   */
  @Query(() => [Lesson])
  fetchLessonLike(
    @Args('page', { defaultValue: 1 }) page: number, //
    @Args('sortBy', { defaultValue: 'DESC', nullable: true }) sortBy: string,
  ) {
    return this.lessonsService.findByLessonLikeCount({
      page,
      sortBy,
    });
  }

  @Query(() => [Lesson])
  fetchRecommendLesson() {
    return this.lessonsService.findByLessonRecommend();
  }

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

  /** 클래스 업데이트 */
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Lesson)
  async updateLesson(
    @Args('lessonId') lessonId: string,
    @Args('nickName') nickName: string,
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
    @Context() context: IContext,
  ) {
    const userEmail = context.req.user.email;
    const result = await this.lessonsService.update({
      userEmail,
      lessonId,
      nickName,
      updateLessonInput,
    });
    return result;
  }

  /** 클래스 삭제 */
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLesson(
    @Args('lessonId') lessonId: string, //
    @Context() context: IContext,
  ) {
    return this.lessonsService.delete({ context, lessonId });
  }
}
