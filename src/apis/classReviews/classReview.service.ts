import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassReview } from './entities/classReview.entity';

@Injectable()
export class ClassReviewService {
  constructor(
    @InjectRepository(ClassReview)
    private readonly userRepository: Repository<ClassReview>,
  ) {}
}
