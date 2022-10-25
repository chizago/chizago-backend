import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entites/lesson.entity';
import { User } from '../users/entities/user.entity';
import { Location } from './entites/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,

    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async create({ createLocationInput }) {
    const { ...location } = createLocationInput;

    await this.locationsRepository.save({
      ...location,
    });
  }
}
