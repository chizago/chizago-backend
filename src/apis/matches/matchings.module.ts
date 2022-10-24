import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../locations/entites/location.entity';
import { MatchStyle } from '../matchStyles/entities/matchStyle.entity';
import { User } from '../users/entities/user.entity';
import { Match } from './entities/match.entity';
import { MatchesResolver } from './matchings.resolver';
import { MatchesService } from './matchings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Match, //
      Location,
      MatchStyle,
      User,
    ]),
  ],
  providers: [
    MatchesResolver, //
    MatchesService,
  ],
})
export class MatchesModule {}
