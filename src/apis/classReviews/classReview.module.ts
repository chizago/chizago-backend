import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassReviewResolver } from './classReview.resolver';
import { ClassReviewService } from './classReview.service';
import { ClassReview } from './entities/classReview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassReview, //
    ]),
  ],
  providers: [
    ClassReviewResolver, //
    ClassReviewService,
  ],
})
export class ClassReviewModule {}
