import { ImagesService } from './image-metadata.service';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { JwtService } from '@nestjs/jwt';
export declare class ImageMetadataController {
    private readonly imagesService;
    private readonly jwtService;
    private readonly logger;
    constructor(imagesService: ImagesService, jwtService: JwtService);
    uploadMetadata(images: CreateImageMetadataDto[]): Promise<{
        message: string;
        data: import("./schemas/image-metadata.schema").ImageData[];
    }>;
}
