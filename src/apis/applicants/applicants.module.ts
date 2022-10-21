import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsResolver } from './applicants.resolver';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './entities/applicant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Applicant, //
    ]),
  ],
  providers: [
    ApplicantsResolver, //
    ApplicantsService,
  ],
})
export class ApplicantsModule {}
