import { Document } from 'mongoose';
export type ImageMetadataDocument = ImageMetadata & Document;
export declare class ImageMetadata {
    latitude: number | null;
    longitude: number | null;
    taken_at: string | null;
    image_url: string;
    image_id: string;
}
export declare const ImageMetadataSchema: import("mongoose").Schema<ImageMetadata, import("mongoose").Model<ImageMetadata, any, any, any, Document<unknown, any, ImageMetadata> & ImageMetadata & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ImageMetadata, Document<unknown, {}, import("mongoose").FlatRecord<ImageMetadata>> & import("mongoose").FlatRecord<ImageMetadata> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
