import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entites/lesson.entity';
import { ClassApplicant } from './entities/classApplicant.entity';

@Injectable()
export class ClassApplicantsService {
  constructor(
    @InjectRepository(ClassApplicant)
    private readonly classApplicantRepository: Repository<ClassApplicant>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  find() {
    return this.classApplicantRepository.find();
  }

  async create({
    createClassApplicantInput,
    context,
  }): Promise<ClassApplicant[]> {
    const { lessonId } = createClassApplicantInput;
    const userId = context.req.user.id;

    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('신청할 레슨을 찾을 수 없습니다.');
    }

    const result = await this.classApplicantRepository.save({
      ...createClassApplicantInput,
      user: userId,
      lesson: lessonId,
    });
    return result;
  }
}
