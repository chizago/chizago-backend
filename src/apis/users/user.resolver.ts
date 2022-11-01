import { UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [User])
  async fetchUsers(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;

    return this.usersService.findAll();
  }
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    //이미 존재하는 아이디인지 확인
    await this.usersService.checkUserExisted({
      email: createUserInput.email,
    });
    const { password, ...user } = createUserInput;
    // 개선 필요
    return this.usersService.create({ newUser: user, newHashedPwd: password });
  }
}
