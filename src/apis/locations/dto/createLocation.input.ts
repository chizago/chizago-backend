import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  addressDetail: string;

  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lng: number;

  @Field(() => String, { nullable: true })
  zipcode: string;
}
