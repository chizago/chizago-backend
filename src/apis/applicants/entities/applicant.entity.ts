import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Match } from 'src/apis/matches/entities/match.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum APPLICANT_STATUS_ENUM {
  PENDING = '신청완료',
  ALLOWED = '승인',
  REJECTED = '거절',
}

registerEnumType(APPLICANT_STATUS_ENUM, {
  name: 'APPLICANT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: APPLICANT_STATUS_ENUM,
    default: APPLICANT_STATUS_ENUM.PENDING,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  status: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Match)
  @Field(() => Match, { nullable: true })
  match: Match;
}
