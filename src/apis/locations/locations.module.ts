import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entites/location.entity';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location, //
    ]),
  ],
  providers: [
    LocationsResolver, //
    LocationsService,
  ],
})
export class LocationsModule {}
