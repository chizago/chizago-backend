import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  address: string;

  @Column()
  @Field(() => String, { nullable: true })
  addressDetail: string;

  @Column()
  @Field(() => Float, { nullable: true })
  lat: number;

  @Column()
  @Field(() => Float, { nullable: true })
  lng: number;

  @Column()
  @Field(() => String, { nullable: true })
  zipcode: string;
}
