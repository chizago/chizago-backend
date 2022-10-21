import { Query, Resolver } from '@nestjs/graphql';
import { MatchingsService } from './matchings.service';

@Resolver()
export class MatchingsResolver {
  constructor(private readonly matchingsService: MatchingsService) {}

  @Query(() => String)
  fetchHello() {
    return 'Hello';
  }
}
