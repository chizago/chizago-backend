import { Query, Resolver } from '@nestjs/graphql';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@Resolver()
export class ReportsResolver {
  constructor(
    private readonly reportsService: ReportsService, //
  ) {}

  //오류방지 아무거나 query만들어놓음

  @Query(() => [Report])
  fetchReports() {
    return this.reportsService.find();
  }
}
