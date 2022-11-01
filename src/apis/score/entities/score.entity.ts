import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => Number)
  win: number;

  @Column({ nullable: true })
  @Field(() => Number)
  lose: number;

  @Column({ nullable: true })
  @Field(() => Float)
  winningRate: number;
}
