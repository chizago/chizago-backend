import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  find() {
    return this.reportRepository.find();
  }

  async findWithDeleted() {
    return await this.reportRepository.find({
      withDeleted: true,
    });
  }

  async create({ email, type, contents }) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    //ETC일때만 contents 내용저장 아니면 기존의 신고 내역 그대로 저장
    let text = type;
    if (type === 'ETC') text = contents;

    return this.reportRepository.save({
      type,
      contents: text,
      user,
    });
  }
}
