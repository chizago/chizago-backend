import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Number)
  num: number;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  liked: number;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  status: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  startDate: Date;

  @Column()
  @Field(() => String)
  period: string;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  count: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
