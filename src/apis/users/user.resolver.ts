import { UseGuards } from '@nestjs/common';
import { Context, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
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
}
