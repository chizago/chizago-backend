import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../matches/entities/match.entity';
import { User } from '../users/entities/user.entity';
import { Applicant } from './entities/applicant.entity';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>, //
  ) {}

  async apply(
    user: User, //
    match: Match,
  ): Promise<boolean> {
    //신청자와 작성자가 동일한 지 확인.(동일한 경우 신청 불가)
    if (user === match.user) {
      throw new ConflictException('매칭 작성자는 신청할 수 없습니다.');
    }

    //매칭 신청
    await this.applicantRepository.save({
      user,
      match,
    });
    return true;
  }

  findAllByMatch(matchId: string): Promise<Applicant[]> {
    return this.applicantRepository.find({
      where: {
        match: {
          id: matchId,
        },
      },
      relations: {
        match: true,
        user: true,
      },
    });
  }
}
