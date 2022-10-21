import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchStyle } from './entities/matchStyle.entity';
import { MatchStylesResolver } from './matchStyles.resolver';
import { MatchStylesService } from './matchStyles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatchStyle, //
    ]),
  ],
  providers: [
    MatchStylesResolver, //
    MatchStylesService,
  ],
})
export class MatchStylesModule {}
