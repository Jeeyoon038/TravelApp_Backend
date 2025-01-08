import { Document } from 'mongoose';
export type ImageDataDocument = ImageData & Document;
export declare class ImageData {
    latitude: number | null;
    longitude: number | null;
    taken_at: string | null;
    image_url: string;
    image_id: string;
}
export declare const ImageDataSchema: import("mongoose").Schema<ImageData, import("mongoose").Model<ImageData, any, any, any, Document<unknown, any, ImageData> & ImageData & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ImageData, Document<unknown, {}, import("mongoose").FlatRecord<ImageData>> & import("mongoose").FlatRecord<ImageData> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
