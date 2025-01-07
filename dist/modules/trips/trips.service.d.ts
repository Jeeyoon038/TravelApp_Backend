import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
export declare class TripsService {
    private tripModel;
    [x: string]: any;
    constructor(tripModel: Model<TripDocument>);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TripDocument> & Trip & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    addMember(tripId: string, googleEmail: string): Promise<Trip>;
    findOne(trip_id: number): Promise<Trip>;
}
