import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MatchStyle {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  matchStyleName: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  player: number;
}
