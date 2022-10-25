import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/image.service';
import { User } from '../users/entities/user.entity';
import { Lesson } from './entites/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,

    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly imagesService: ImagesService,
  ) {}

  async create({ user, createLessonInput }) {
    const { location, image, ...lesson } = createLessonInput;

    const _user = await this.usersRepository.findOne({
      where: { email: user },
    });

    const result = await this.lessonsRepository.save({
      ...lesson,
      location,
      image,
      user: _user.id,
    });

    if (image) {
      await this.imagesService.createLessonImage({ image, result });
    }
  }
}
