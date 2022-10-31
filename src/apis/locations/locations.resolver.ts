import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { Repository } from 'typeorm';
import { CreateLocationInput } from './dto/createLocation.input';
import { Location } from './entites/location.entity';
import { LocationsService } from './locations.service';

/**
 * Lesson GraphQL API Resolver
 * @APIs
 * 'createLocation',
 */

@Resolver()
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,

    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  /** 위치 생성 */
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Location)
  async createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ) {
    const result = await this.locationsService.create({
      ...createLocationInput,
    });
    return result;
  }
}
