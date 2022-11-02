import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/apis/lessons/entites/lesson.entity';
import { Match } from 'src/apis/matches/entities/match.entity';
import { Score } from 'src/apis/score/entities/score.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String)
  nickname: string;

  @Column({ nullable: true })
  @Field(() => String)
  password: string;

  @Column({ nullable: true })
  @Field(() => String)
  phoneNum: string;

  @Column({ nullable: true })
  @Field(() => String)
  zipCode: string;

  @Column({ nullable: true })
  @Field(() => Float)
  temperature: number;

  @Column({ nullable: true })
  @Field(() => Float)
  ntrp: number;

  @Column({ nullable: true })
  @Field(() => Number)
  career: number;

  @Column({ nullable: true })
  @Field(() => Boolean)
  gender: boolean;

  @Column({ nullable: true })
  @Field(() => String)
  profileImg: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  //찜
  @ManyToMany(() => Match, (matchings) => matchings.users)
  @Field(() => [Match])
  matchings: Match[];

  @OneToMany(() => Lesson, (lesson) => lesson.user, {
    nullable: true,
  })
  @Field(() => [Lesson], { nullable: true })
  lesson: Lesson[];

  //전적
  @JoinColumn()
  @OneToOne(() => Score)
  @Field(() => Score, { nullable: true })
  score: Score;
}
