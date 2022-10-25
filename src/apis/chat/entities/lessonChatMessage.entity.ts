import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonChatRoom } from './lessonChatRoom.entity';

@Entity()
@ObjectType()
export class LessonChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  message: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => LessonChatRoom)
  @Field(() => LessonChatRoom)
  room: LessonChatRoom;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
