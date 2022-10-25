import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entites/lesson.entity';
import { Location } from './entites/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  async create({ ...createLocationInput }) {
    const { ...location } = createLocationInput;

    return await this.locationsRepository.save({
      ...location,
    });
  }
}
