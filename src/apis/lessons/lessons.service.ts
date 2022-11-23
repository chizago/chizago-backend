import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassLike } from '../classLikes/entities/classLike.entity';
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

    @InjectRepository(ClassLike)
    private readonly classLikesRepository: Repository<ClassLike>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly imagesService: ImagesService,
  ) {}

  async findOne({ lessonId }: { lessonId: string }): Promise<Lesson> {
    const result = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: [
        'images',
        'location',
        'user',
        'classLike',
        'classApplicant',
        'classReview',
      ],
    });
    return result;
  }

  async findAll({ page }: { page: number }): Promise<Lesson[]> {
    const result = await this.lessonsRepository.find({
      relations: [
        'images',
        'location',
        'user',
        'classLike',
        'classApplicant',
        'classReview',
      ],
      take: 10,
      skip: (page - 1) * 10,
    });
    return result;
  }

  async findByCreatedAt({ page, sortBy }): Promise<Lesson[]> {
    return await this.lessonsRepository.find({
      relations: [
        'images',
        'location',
        'user',
        'classLike',
        'classApplicant',
        'classReview',
      ],
      order: { createdAt: sortBy },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  async findByLessonLikeCount({ page, sortBy }): Promise<Lesson[]> {
    return await this.lessonsRepository.find({
      relations: [
        'images',
        'location',
        'user',
        'classLike',
        'classApplicant',
        'classReview',
      ],
      order: { classLike: sortBy },
      take: 6,
      skip: page ? (page - 1) * 6 : 0,
    });
  }

  async findByLessonRecommend() {
    const randomLesson = await this.lessonsRepository.find({
      relations: [
        'images',
        'location',
        'user',
        'classLike',
        'classApplicant',
        'classReview',
      ],
    });
    const idx = [];

    if (randomLesson.length <= 3) {
      return randomLesson;
    }

    while (idx.length <= 3) {
      const tmp = Math.floor(Math.random() * randomLesson.length);
      if (idx.includes(tmp)) continue;

      idx.push(tmp);
    }
    const ret = idx.map((v, i) => {
      return randomLesson[v];
    });

    return ret;
  }

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
    return result;
  }

  async update({
    userEmail,
    lessonId,
    nickName,
    updateLessonInput,
  }): Promise<Lesson[]> {
    const { image } = updateLessonInput;

    const myLesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: ['user'],
    });

    if (!myLesson)
      throw new UnprocessableEntityException('등록된 레슨이 없습니다.');
    if (userEmail !== myLesson.user.email)
      throw new ConflictException(`${nickName}님의 카페가 아닙니다.`);

    const _image = await this.imagesRepository.find({
      where: { lesson: { id: lessonId } },
    });

    await Promise.all(
      _image.map(
        (el) =>
          new Promise((resolve) => {
            this.imagesRepository.softDelete({ id: el.id });
            resolve('이미지 삭제 완료');
          }),
      ),
    );

    await Promise.all(
      image.map(
        ({ el }: { el: string }) =>
          new Promise((resolve) => {
            this.imagesRepository.save({
              url: el,
              lesson: { id: myLesson.id },
            });
            resolve('이미지 저장 완료');
          }),
      ),
    );

    const result = await this.lessonsRepository.save({
      ...myLesson,
      ...updateLessonInput,
    });
    return result;
  }

  async delete({ context, lessonId }): Promise<boolean> {
    const userEmail = context.req.user.email;
    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: ['user'],
    });
    if (lesson.user.email !== userEmail)
      throw new ConflictException('레슨의 작성자만 삭제할 수 있습니다.');

    const result = await this.lessonsRepository.softDelete({
      id: lessonId,
    });
    this.imagesRepository.delete({ lesson: { id: lesson.id } });
    this.classLikesRepository.delete({ lesson: { id: lesson.id } });
    return result.affected ? true : false;
  }
}
