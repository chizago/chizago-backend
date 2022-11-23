import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lessons/entites/lesson.entity';
import { ClassApplicantsResolver } from './classApplicants.resolver';
import { ClassApplicantsService } from './classApplicants.service';
import { ClassApplicant } from './entities/classApplicant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassApplicant, //
      Lesson,
    ]),
  ],

  providers: [
    ClassApplicantsResolver, //
    ClassApplicantsService,
  ],
})
export class ClassApplicantsModule {}
