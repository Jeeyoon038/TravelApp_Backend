import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { GoogleUserService } from '../google-user/google-user.service';
export declare class TripsService {
    private tripModel;
    private readonly googleUserService;
    constructor(tripModel: Model<TripDocument>, googleUserService: GoogleUserService);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TripDocument> & Trip & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    addMember(tripId: string, googleEmail: string): Promise<Trip>;
    findOne(trip_id: number): Promise<Trip>;
    findByUser(userId: string): Promise<Trip[]>;
}
