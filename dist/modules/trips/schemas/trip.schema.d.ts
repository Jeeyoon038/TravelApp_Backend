import { Document, Model } from 'mongoose';
export type TripDocument = Trip & Document;
export declare class Trip {
    trip_id: number;
    title: string;
    start_date: Date;
    end_date: Date;
    image_urls: string[];
    member_google_ids: string[];
    created_by: string;
}
export declare const TripSchema: import("mongoose").Schema<Trip, Model<Trip, any, any, any, Document<unknown, any, Trip> & Trip & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Trip, Document<unknown, {}, import("mongoose").FlatRecord<Trip>> & import("mongoose").FlatRecord<Trip> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
