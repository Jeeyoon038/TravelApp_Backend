import { Model } from 'mongoose';
import { ImageMetadata, ImageMetadataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
export declare class ImagesService {
    private imageModel;
    constructor(imageModel: Model<ImageMetadataDocument>);
    create(createImageDto: CreateImageMetadataDto): Promise<ImageMetadata>;
    findByTripId(tripId: string): Promise<ImageMetadata[]>;
    findAll(): Promise<ImageMetadata[]>;
    findOne(imageId: string): Promise<ImageMetadata>;
    createMany(imageList: CreateImageMetadataDto[]): Promise<ImageMetadata[]>;
    delete(imageId: string): Promise<ImageMetadata>;
    deleteByTripId(tripId: string): Promise<{
        deletedCount: number;
    }>;
}
