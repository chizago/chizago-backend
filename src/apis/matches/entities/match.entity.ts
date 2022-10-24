import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Location } from 'src/apis/locations/entites/location.entity';
import { MatchStyle } from 'src/apis/matchStyles/entities/matchStyle.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MATCH_STATUS_ENUM {
  RECRUITING = '모집중',
  RECRUIT_COMPLETE = '모집완료',
  MATCHING_FINISH = '경기종료',
}

registerEnumType(MATCH_STATUS_ENUM, {
  name: 'MATCH_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Match {
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
  @Field(() => Int, { nullable: true })
  player: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  imgUrl: string;

  @Column({
    type: 'enum',
    enum: MATCH_STATUS_ENUM,
    default: MATCH_STATUS_ENUM.RECRUITING,
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

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @JoinColumn()
  @OneToOne(() => Location)
  @Field(() => Location, { nullable: true })
  location: Location;

  //찜
  @JoinTable()
  @ManyToMany(() => User, (users) => users.matchings)
  @Field(() => [User])
  users: User[];
}
