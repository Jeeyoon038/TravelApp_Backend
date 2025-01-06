// src/modules/trips/trips.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const tripData = {
      ...createTripDto,
      start_date: new Date(createTripDto.start_date),
      end_date: new Date(createTripDto.end_date)
    };
    
    const createdTrip = new this.tripModel(tripData);
    return createdTrip.save();
  }

  async findAll() {
    try {
      console.log('Fetching all trips from database');
      const trips = await this.tripModel.find().sort({ trip_id: -1 }).exec();
      console.log('Found trips:', trips);
      return trips;
    } catch (error) {
      console.error('Error in findAll service:', error);
      throw error;
    }
  }
  

  //ID로 특정 여행 데이터 가져오기기
  async findOne(trip_id: number): Promise<Trip> {
    return this.tripModel.findOne({ trip_id }).exec();
  }
}