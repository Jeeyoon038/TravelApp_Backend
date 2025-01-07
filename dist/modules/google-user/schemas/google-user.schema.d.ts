import { HydratedDocument } from 'mongoose';
export type GoogleUserDocument = HydratedDocument<GoogleUser>;
export declare class GoogleUser {
    googleId: string;
    email: string;
    displayName: string;
    firstName: string;
    lastName: string;
    photo: string;
    accessToken: string;
}
export declare const GoogleUserSchema: import("mongoose").Schema<GoogleUser, import("mongoose").Model<GoogleUser, any, any, any, import("mongoose").Document<unknown, any, GoogleUser> & GoogleUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GoogleUser, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GoogleUser>> & import("mongoose").FlatRecord<GoogleUser> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
