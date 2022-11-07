import { Field, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/apis/lessons/entites/lesson.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ClassApplicant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  applyDate: Date;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Lesson)
  @Field(() => Lesson)
  lesson: Lesson;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
