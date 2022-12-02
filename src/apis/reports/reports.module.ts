import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Report } from './entities/report.entity';
import { ReportsResolver } from './reports.resolver';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report, //
      User,
    ]),
  ],

  providers: [
    ReportsResolver, //
    ReportsService,
  ],
})
export class ReportsModule {}
