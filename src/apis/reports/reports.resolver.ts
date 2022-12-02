import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@Resolver()
export class ReportsResolver {
  constructor(
    private readonly reportsService: ReportsService, //
  ) {}

  @Query(() => [Report])
  fetchReports() {
    return this.reportsService.find();
  }

  @Query(() => [Report])
  fetchReportsWithDel() {
    return this.reportsService.findWithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Report)
  createReports(
    @Context() context: any, //
    @Args({ name: 'type', description: '신고 타입' }) type: string,
    @Args({ name: 'contents', description: 'etc일때 적는 내용' })
    contents: string,
  ) {
    const email = context.req.user.email;
    return this.reportsService.create({ email, type, contents });
  }
}
