import { Document } from 'mongoose';
export type GoogleUserDocument = GoogleUser & Document;
export declare class GoogleUser {
    googleId: string;
    email: string;
    name: string;
    photo: string;
}
export declare const GoogleUserSchema: import("mongoose").Schema<GoogleUser, import("mongoose").Model<GoogleUser, any, any, any, Document<unknown, any, GoogleUser> & GoogleUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GoogleUser, Document<unknown, {}, import("mongoose").FlatRecord<GoogleUser>> & import("mongoose").FlatRecord<GoogleUser> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
