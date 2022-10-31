import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassLike } from '../classLikes/entities/classLike.entity';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/image.service';
import { User } from '../users/entities/user.entity';
import { Lesson } from './entites/lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lesson, //
      Image,
      User,
      ClassLike,
    ]),
  ],
  providers: [
    LessonsResolver, //
    LessonsService,
    ImagesService,
  ],
})
export class LessonsModule {}
