import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Context } from '@nestjs/graphql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //
  }
  async findAll() {
    const users = await this.userRepository.find({});
  }
  //관리자용 유저 한명 아이디로 조회
  findOneById({ userId }) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
    //관리자용 유저 한명 email로 조회
  }
  findOneByEmail({ email }) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async checkUserExisted({ email }) {
    const result = await this.userRepository.findOne({
      where: { email },
      // 탈퇴한 유저도 포함?
      withDeleted: true,
    });
    if (result) {
      throw new UnprocessableEntityException('이미 사용중인 아이디입니다.');
    }
  }
  async encrypPassword({ password }) {
    const hashedPwd = await bcrypt.hash(password, 10);
    return hashedPwd;
  }

  async create({ newUser, newHashedPwd: password }) {
    //코드 리뷰 필수
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    //User 데이터 저장
    const userResult = await this.userRepository.save({
      ...newUser,
      password,
      report: 0,
      win: 0,
      lose: 0,
      winningRate: 0,
    });

    return userResult;
  }
}
