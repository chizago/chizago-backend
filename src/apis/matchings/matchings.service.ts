import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventImage } from './entities/matching.entity';

@Injectable()
export class MatchingsService {
  constructor(
    @InjectRepository(EventImage)
    private readonly eventImageRepository: Repository<EventImage>,
  ) {}
}
