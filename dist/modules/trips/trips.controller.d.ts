import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './schemas/trip.schema';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/trip.schema").TripDocument> & Trip & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    test(): {
        message: string;
    };
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findOne(id: number): Promise<Trip>;
    addMember(tripId: string, body: {
        googleEmail: string;
    }): Promise<Trip>;
}
