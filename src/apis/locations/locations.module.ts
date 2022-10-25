import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../lessons/entites/lesson.entity';
import { Location } from './entites/location.entity';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location, //
      Lesson,
    ]),
  ],
  providers: [
    LocationsResolver, //
    LocationsService,
  ],
})
export class LocationsModule {}
