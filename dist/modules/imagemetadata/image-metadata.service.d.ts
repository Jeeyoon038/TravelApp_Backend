import { Model } from 'mongoose';
import { ImageData, ImageDataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
export declare class ImagesService {
    private imageModel;
    constructor(imageModel: Model<ImageDataDocument>);
    createMany(imageList: CreateImageMetadataDto[]): Promise<ImageData[]>;
}
