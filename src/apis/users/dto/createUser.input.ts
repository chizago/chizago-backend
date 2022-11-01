import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true, name: 'email' })
  email: string;

  @Field(() => String, { nullable: true, name: 'password' })
  password: string;

  @Field(() => String, { nullable: true, name: 'nickname' })
  nickname: string;

  @Field(() => String, { nullable: true, name: 'gender' })
  gender: boolean;

  @Field(() => Float, { nullable: true, name: 'ntrp' })
  ntrp: number;

  @Field(() => Number, { nullable: true, name: 'career' })
  career: number;

  @Field(() => String, { nullable: true, name: 'phoneNum' })
  phoneNum: string;

  @Field(() => String, { nullable: true, name: 'zipCode' })
  zipCode: string;
}
