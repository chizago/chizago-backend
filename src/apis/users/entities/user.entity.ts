import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Matching } from 'src/apis/matchings/entities/matching.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => Number)
  password: number;

  @Column()
  @Field(() => Float)
  temperature: number;

  @Column()
  @Field(() => Float)
  ntrp: number;

  @Column()
  @Field(() => Number)
  career: number;

  @Column()
  @Field(() => Number)
  point: number;

  @Column()
  @Field(() => Boolean)
  gender: boolean;
  //boolean으로 할지,string으로 할지...

  @Column()
  @Field(() => String)
  profileImg: string;

  @Field(() => Boolean)
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
  @ManyToMany(() => Matching, (matchings) => matchings.users)
  @Field(() => [Matching])
  matchings: Matching[];
}
