import { Resolver } from '@nestjs/graphql';
import { MatchStylesService } from './matchStyles.service';

@Resolver()
export class MatchStylesResolver {
  constructor(
    private readonly matchStylesService: MatchStylesService, //
  ) {}
}
