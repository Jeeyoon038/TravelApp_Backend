import { Document, Types } from 'mongoose';
export type DiaryDocument = Diary & Document;
export declare class Diary {
    trip_id: Types.ObjectId;
    date: string;
    content: string;
    author: Types.ObjectId;
}
export declare const DiarySchema: import("mongoose").Schema<Diary, import("mongoose").Model<Diary, any, any, any, Document<unknown, any, Diary> & Diary & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Diary, Document<unknown, {}, import("mongoose").FlatRecord<Diary>> & import("mongoose").FlatRecord<Diary> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
