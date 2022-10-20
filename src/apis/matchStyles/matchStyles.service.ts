import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchStyle } from './entities/matchStyle.entity';

@Injectable()
export class MatchStylesService {
  constructor(
    @InjectRepository(MatchStyle)
    private readonly matchStyleRepository: Repository<MatchStyle>,
  ) {}
}
