import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../locations/entites/location.entity';
import { MatchStyle } from '../matchStyles/entities/matchStyle.entity';
import { User } from '../users/entities/user.entity';
import { Matching } from './entities/matching.entity';
import { MatchingsResolver } from './matchings.resolver';
import { MatchingsService } from './matchings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Matching, //
      Location,
      MatchStyle,
      User,
    ]),
  ],
  providers: [
    MatchingsResolver, //
    MatchingsService,
  ],
})
export class MatchingsModule {}
