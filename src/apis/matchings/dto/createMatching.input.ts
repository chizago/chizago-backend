import { Field, InputType, Int } from '@nestjs/graphql';
import { LocationInput } from 'src/apis/locations/dto/createLocation.input';

@InputType()
export class CreateMatchingInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  matchStyle: string;

  @Field(() => String, { nullable: true })
  level: string;

  @Field(() => String, { nullable: true })
  contents: string;

  @Field(() => LocationInput, { nullable: true })
  location: LocationInput;

  @Field(() => String, { nullable: true })
  date: string;

  @Field(() => String, { nullable: true })
  time: string;

  @Field(() => String, { nullable: true })
  imgUrl: string;
}
