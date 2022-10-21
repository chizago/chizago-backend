import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventImage } from './entities/matching.entity';
import { MatchingsResolver } from './matchings.resolver';
import { MatchingsService } from './matchings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventImage, //
    ]),
  ],
  providers: [
    MatchingsResolver, //
    MatchingsService,
  ],
})
export class MatchingsModule {}
