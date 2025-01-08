import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { GoogleUserService } from '../google-user/google-user.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private readonly googleUserService: GoogleUserService
  ) {}

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
  
  async addMember(tripId: string, googleEmail: string): Promise<Trip> {
    const googleUser = await this.googleUserService.findByEmail(googleEmail);
    const trip = await this.tripModel.findById(tripId).exec();
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }

    if (!trip.member_google_ids.includes(googleUser.googleId)) {
      trip.member_google_ids.push(googleUser.googleId);
      await trip.save();
    } else {
      console.log(`GoogleId ${googleUser.googleId} is already a member of Trip ${tripId}`);
    }

    return trip;
  }

  async findOne(trip_id: number): Promise<Trip> {
    return this.tripModel.findOne({ trip_id }).exec();
  }
}