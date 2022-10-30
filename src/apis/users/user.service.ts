import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 등록된 유저 전체 조회
  }
  async findAll() {
    const users = await this.userRepository.find({});
  }
  //관리자용 유저 한명 조회
  findOneById({ userId }) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
