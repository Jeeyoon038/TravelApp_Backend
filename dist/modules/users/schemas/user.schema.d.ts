import { Document, Schema as MongooseSchema } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    googleId: string;
    email: string;
    profilePhoto: string;
    displayName: string;
    following: MongooseSchema.Types.ObjectId[];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
