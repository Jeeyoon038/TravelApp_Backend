// src/modules/image-metadata/image-metadata.service.ts

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageMetadata, ImageMetadataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';

@Injectable()
export class ImageMetadataService {
  constructor(
    @InjectModel(ImageMetadata.name) private imageMetadataModel: Model<ImageMetadataDocument>,
  ) {}

  async create(createImageMetadataDto: CreateImageMetadataDto): Promise<ImageMetadata> {
    try {
      const createdMetadata = new this.imageMetadataModel(createImageMetadataDto);
      return await createdMetadata.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new ConflictException('Image metadata with this image_id already exists.');
      }
      throw new BadRequestException('Failed to create image metadata.');
    }
  }

  async findAll(): Promise<ImageMetadata[]> {
    return this.imageMetadataModel.find().exec();
  }

  async findOne(id: string): Promise<ImageMetadata> {
    const imageMetadata = await this.imageMetadataModel.findById(id).exec();
    if (!imageMetadata) {
      throw new NotFoundException(`ImageMetadata with id ${id} not found`);
    }
    return imageMetadata;
  }

  async delete(id: string): Promise<ImageMetadata> {
    const deletedImageMetadata = await this.imageMetadataModel.findByIdAndDelete(id).exec();
    if (!deletedImageMetadata) {
      throw new NotFoundException(`ImageMetadata with id ${id} not found`);
    }
    return deletedImageMetadata;
  }
}
