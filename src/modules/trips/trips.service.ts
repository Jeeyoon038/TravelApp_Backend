// src/modules/trips/trips.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const createdTrip = new this.tripModel(createTripDto);
    return createdTrip.save();
  }


  //모든 여행 데이터 가져오기기
  async findAll(): Promise<Trip[]> {
    return this.tripModel.find().exec();
  }


  //ID로 특정 여행 데이터 가져오기기
  async findOne(trip_id: number): Promise<Trip> {
    return this.tripModel.findOne({ trip_id }).exec();
  }
}