import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum REPORT_TYPE_ENUM {
  SWEAR_WORD = '욕설',
  NO_SHOW = '예약 후 나타나지 않음',
  ETC = '기타',
}

registerEnumType(REPORT_TYPE_ENUM, {
  name: 'REPORT_TYPE_ENUM',
});

@Entity()
@ObjectType()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: REPORT_TYPE_ENUM,
    default: REPORT_TYPE_ENUM.ETC,
    nullable: true,
  })
  @Field(() => REPORT_TYPE_ENUM, { nullable: true })
  type: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  contents: string;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
