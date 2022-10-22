import { Field, ObjectType } from '@nestjs/graphql';
import { ClassApplicant } from 'src/apis/classApplicants/entities/classApplicant.entity';
import { ClassLike } from 'src/apis/classLikes/entities/classLike.entity';
import { ClassReview } from 'src/apis/classReviews/entities/classReview.entity';
import { Image } from 'src/apis/images/entities/image.entity';
import { Location } from 'src/apis/locations/entites/location.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
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

  @JoinTable()
  @OneToMany(() => Image, (image) => image.lesson, {
    nullable: true,
    cascade: true,
  })
  @Field(() => [Image], { nullable: true })
  images: Image[];

  @JoinColumn()
  @OneToOne(() => Location)
  location: Location;

  @OneToMany(() => ClassLike, (classLike) => classLike.lesson, {
    nullable: true,
  })
  @Field(() => [ClassLike], { nullable: true })
  classLike: ClassLike[];

  @OneToMany(() => ClassReview, (classReview) => classReview.lesson, {
    nullable: true,
  })
  @Field(() => [ClassReview], { nullable: true })
  classReview: ClassReview[];

  @OneToMany(() => ClassApplicant, (classApplicant) => classApplicant.lesson, {
    nullable: true,
  })
  @Field(() => [ClassApplicant], { nullable: true })
  classApplicant: ClassApplicant[];

  @ManyToOne(() => User, { nullable: true })
  @Field(() => User, { nullable: true })
  user: User;
}
