import { ImagesService } from './image-metadata.service';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { ImageMetadata } from './schemas/image-metadata.schema';
export declare class ImageMetadataController {
    private readonly imageMetadataService;
    constructor(imageMetadataService: ImagesService);
    create(createImageMetadataDto: CreateImageMetadataDto): Promise<ImageMetadata>;
    findAll(): Promise<ImageMetadata[]>;
    findOne(id: string): Promise<ImageMetadata>;
    delete(id: string): Promise<void>;
}
