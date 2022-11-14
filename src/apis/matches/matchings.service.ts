import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Location } from '../locations/entites/location.entity';
import { MatchStyle } from '../matchStyles/entities/matchStyle.entity';
import { User } from '../users/entities/user.entity';
import { CreateMatchInput } from './dto/createMatch.input';
import { UpdateMatchInput } from './dto/updateMatch.input';
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

  findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: {
        matchStyle: true,
        user: true,
        location: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(matchId: string): Promise<Match> {
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
  ): Promise<Match> {
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
        throw new ConflictException(
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
      throw new ConflictException(error);
    } finally {
      //QueryRunner 연결 해제
      await queryRunner.release();
    }
  }

  async update(
    matchId: string,
    updateMatchInput: UpdateMatchInput, //
    email: string,
  ): Promise<Match> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    //트랜잭션 시작
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      //해당 매치 가져오기
      const match = await this.matchRepository.findOne({
        where: { id: matchId },
        relations: {
          matchStyle: true,
          user: true,
          location: true,
        },
      });

      //temporary - 작성자가 일치한지 확인
      if (email !== match.user.email) {
        throw new ConflictException('수정할 권한이 없는 사용자입니다.');
      }

      const { location, matchStyle, date, time, age, ...restMatch } =
        updateMatchInput;

      //위치 정보 수정
      const newLocation = this.locationRepository.create({
        id: match.location.id,
        ...location,
      });
      await queryRunner.manager.save(newLocation);

      //매치 스타일 찾기
      const newMatchStyle = await this.matchStyleRepository.findOne({
        where: { matchStyleName: matchStyle },
      });
      if (!newMatchStyle) {
        throw new ConflictException(
          '매치 스타일 값이 잘못되었습니다. 매치 스타일을 확인해주세요.',
        );
      }

      //날짜 및 시간 입력값 합치기
      const newDate = new Date(`${date} ${time}`);

      //해당 매치 수정
      const updatedMatch = this.matchRepository.create({
        ...match,
        ageMax: age,
        ageMin: age,
        location: newLocation,
        matchStyle: newMatchStyle,
        date: newDate,
        ...restMatch,
      });
      await queryRunner.manager.save(updatedMatch);

      //트랜잭션 commit 확정
      await queryRunner.commitTransaction();

      return updatedMatch;
    } catch (error) {
      //에러 발생 시 Rollback
      await queryRunner.rollbackTransaction();
    } finally {
      //QueryRunner 연결 해제
      await queryRunner.release();
    }
  }

  parseData(result: object[]) {
    return result.map((ele) => {
      return this.matchRepository.create({
        id: ele['_source'].id,
        title: ele['_source'].title,
        matchStyle: {
          matchStyleName: ele['_source'].matchStyleName,
        },
        location: {
          address: ele['_source'].address,
          addressDetail: ele['_source'].addressDetail,
        },
        level: ele['_source'].level,
        imgUrl: ele['_source'].imgUrl,
        status: ele['_source'].status,
        date: ele['_source'].date,
      });
    });
  }
}
