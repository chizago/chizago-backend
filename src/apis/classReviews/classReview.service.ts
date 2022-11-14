import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassApplicant } from '../classApplicants/entities/classApplicant.entity';
import { Lesson } from '../lessons/entites/lesson.entity';
import { User } from '../users/entities/user.entity';
import { ClassReview } from './entities/classReview.entity';

@Injectable()
export class ClassReviewService {
  constructor(
    @InjectRepository(ClassReview)
    private readonly classReview: Repository<ClassReview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(ClassApplicant)
    private readonly classApplicant: Repository<ClassApplicant>,
  ) {}

  find({ id }) {
    return this.classReview.find({
      where: {
        lesson: { id },
      },
    });
  }

  async create({ id, contents, email }) {
    //사용자 정보 찾기
    const user: any = await this.userRepository.findOne({
      where: { email },
    });

    //신청자에 유저 존재 찾기
    const classApplicantUSer: any = await this.classApplicant.findOne({
      where: {
        user: { id: user.id },
      },
      relations: ['user', 'lesson'],
    });
    //신청자 정보 예외처리
    if (!classApplicantUSer) {
      throw new ConflictException('신청 정보가 없습니다.');
    }

    //lesson 찾기
    const lesson: any = await this.lessonRepository.find({
      where: { id },
    });
    //lesson 예외처리
    if (!lesson) {
      throw new ConflictException('해당 수업 정보가 없습니다.');
    }

    //리뷰 저장하기
    return this.classReview.save({
      contents,
      user,
      lesson,
    });
  }
}
