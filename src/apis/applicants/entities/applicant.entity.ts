import { Field, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/apis/matches/entities/match.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  status: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Match)
  @Field(() => Match, { nullable: true })
  matching: Match;
}
