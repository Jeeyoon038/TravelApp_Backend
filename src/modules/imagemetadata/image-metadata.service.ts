// src/modules/image-metadata/image-metadata.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageMetadata, ImageMetadataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { UploadService } from '../uploadImage/upload.service';

@Injectable()
export class ImageMetadataService {
  UploadService: any;
  constructor(
    @InjectModel(ImageMetadata.name) private imageMetadataModel: Model<ImageMetadataDocument>
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // UploadService를 사용하여 S3에 업로드
    const imageUrl = await this.UploadService.uploadImage(file);
    return imageUrl; // 업로드된 이미지의 URL 반환
  }

  async create(createImageMetadataDto: CreateImageMetadataDto): Promise<ImageMetadata> {
    const createdImageMetadata = new this.imageMetadataModel(createImageMetadataDto);
    return createdImageMetadata.save();
  }

  async findAll(): Promise<ImageMetadata[]> {
    return this.imageMetadataModel.find().exec();
  }

  async findOne(image_id: number): Promise<ImageMetadata> {
    return this.imageMetadataModel.findOne({ image_id }).exec();
  }

  async delete(image_id: number): Promise<ImageMetadata> {
    return this.imageMetadataModel.findOneAndDelete({ image_id }).exec();
  }

  
}