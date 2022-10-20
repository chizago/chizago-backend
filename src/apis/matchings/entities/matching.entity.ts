import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MatchStyle } from 'src/apis/matchStyles/entities/matchStyle.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MATCHING_STATUS_ENUM {
  RECRUITING = '모집중',
  RECRUIT_COMPLETE = '모집완료',
  MATCHING_FINISH = '경기종료',
}

registerEnumType(MATCHING_STATUS_ENUM, {
  name: 'MATCHING_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Matching {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  ageMax: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  ageMin: number;

  // @Column({ nullable: true })
  // @Field(() => String, { nullable: true })
  // matchStyle: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  level: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  contents: string;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  date: Date;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  time: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  player: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  imgUrl: string;

  @Column({
    type: 'enum',
    enum: MATCHING_STATUS_ENUM,
    default: MATCHING_STATUS_ENUM.RECRUITING,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  status: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => MatchStyle)
  @Field(() => MatchStyle, { nullable: true })
  matchStyle: MatchStyle;
}
