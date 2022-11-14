import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassApplicant } from '../classApplicants/entities/classApplicant.entity';
import { Lesson } from '../lessons/entites/lesson.entity';
import { User } from '../users/entities/user.entity';
import { ClassReviewResolver } from './classReview.resolver';
import { ClassReviewService } from './classReview.service';
import { ClassReview } from './entities/classReview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassReview, //
      User,
      Lesson,
      ClassApplicant,
    ]),
  ],
  providers: [
    ClassReviewResolver, //
    ClassReviewService,
  ],
})
export class ClassReviewModule {}
