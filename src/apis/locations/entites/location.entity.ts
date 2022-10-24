import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  addressDetail: string;

  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  lng: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  zipcode: string;
}
