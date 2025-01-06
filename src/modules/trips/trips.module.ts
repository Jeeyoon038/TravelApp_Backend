import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/trip.schema';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { GoogleUserModule } from '../google-user/google-user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    GoogleUserModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}