import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matching } from './entities/matching.entity';
import { MatchingsResolver } from './matchings.resolver';
import { MatchingsService } from './matchings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Matching, //
    ]),
  ],
  providers: [
    MatchingsResolver, //
    MatchingsService,
  ],
})
export class MatchingsModule {}
