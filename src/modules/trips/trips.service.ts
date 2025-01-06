import { Injectable, NotFoundException } from '@nestjs/common';
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
    const tripData = {
      ...createTripDto,
      start_date: new Date(createTripDto.start_date),
      end_date: new Date(createTripDto.end_date)
    };
    
    const createdTrip = new this.tripModel(tripData);
    const savedTrip = await createdTrip.save();
    return savedTrip;
  }

  async findAll() {
    try {
      console.log('Fetching all trips from database');
      const trips = await this.tripModel.find().exec();
      console.log('Found trips:', trips);
      return trips;
    } catch (error) {
      console.error('Error in findAll service:', error);
      throw error;
    }
  }

  async findOne(tripId: string): Promise<Trip> {
    const trip = await this.tripModel.findOne({ trip_id: tripId }).exec();
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }
    return trip;
  }

  async addMember(tripId: string, googleEmail: string): Promise<Trip> {
    const trip = await this.findOne(tripId);
    
    if (!trip.member_google_ids.includes(googleEmail)) {
      trip.member_google_ids.push(googleEmail);
      await (trip as TripDocument).save();
    }

    return trip;
  }
}