import { Field, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/apis/matches/entities/match.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class MatchChatRoom {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  host: User;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  player1: User;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  player2: User;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  player3: User;

  @JoinColumn()
  @OneToOne(() => Match)
  @Field(() => Match, { nullable: true })
  match: Match;
}
