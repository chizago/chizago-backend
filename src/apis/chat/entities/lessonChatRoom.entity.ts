import { Field, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/apis/lessons/entites/lesson.entity';
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
export class ChatRoom {
  @PrimaryColumn()
  @Field(() => String)
  id: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  instructor: User;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  student: User;

  @JoinColumn()
  @OneToOne(() => Lesson)
  @Field(() => Lesson, { nullable: true })
  lesson: Lesson;
}
