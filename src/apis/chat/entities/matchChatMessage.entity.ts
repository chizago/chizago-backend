import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchChatRoom } from './matchChatRoom.entity';

@Entity()
@ObjectType()
export class MatchChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  message: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => MatchChatRoom)
  @Field(() => MatchChatRoom)
  room: MatchChatRoom;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
