import { Field, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/apis/lessons/entites/lesson.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ClassLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Lesson)
  @Field(() => Lesson, { nullable: true })
  lesson: Lesson;
}
