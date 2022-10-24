import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Location } from '../locations/entites/location.entity';
import { MatchStyle } from '../matchStyles/entities/matchStyle.entity';
import { User } from '../users/entities/user.entity';
import { CreateMatchInput } from './dto/createMatch.input';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(MatchStyle)
    private readonly matchStyleRepository: Repository<MatchStyle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  findOne(matchId: string) {
    return this.matchRepository.findOne({
      where: { id: matchId },
      relations: {
        matchStyle: true,
        user: true,
        location: true,
      },
    });
  }

  async create(
    createMatchInput: CreateMatchInput, //
    email: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    //트랜잭션 시작
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const { location, matchStyle, date, time, age, ...matching } =
        createMatchInput;

      //위치 정보 저장
      const newLocation = this.locationRepository.create({
        ...location,
      });
      await queryRunner.manager.save(newLocation);

      //매치 스타일 찾기
      const newMatchStyle = await this.matchStyleRepository.findOne({
        where: { matchStyleName: matchStyle },
      });
      if (!newMatchStyle) {
        throw new NotFoundException(
          '매치 스타일 값이 잘못되었습니다. 매치 스타일을 확인해주세요.',
        );
      }

      //날짜 및 시간 입력값 합치기
      const newDate = new Date(`${date} ${time}`);

      //temporary - user
      const user = await this.userRepository.findOne({
        where: { email },
      });

      //temporary - 모집 연령을 max, min으로 나눌지 string으로 받을 지 한 연령대만 넣을 지 상의가 안돼었으므로 현재 db에 따라 개발
      const newMatching = this.matchRepository.create({
        ...matching,
        ageMax: age,
        ageMin: age,
        date: newDate,
        player: newMatchStyle.player,
        matchStyle: newMatchStyle,
        user,
        location: newLocation,
      });
      await queryRunner.manager.save(newMatching);

      //트랜잭션 commit 확정
      await queryRunner.commitTransaction();

      return newMatching;
    } catch (error) {
      //에러 발생 시 Rollback
      await queryRunner.rollbackTransaction();
    } finally {
      //QueryRunner 연결 해제
      await queryRunner.release();
    }
  }
}
