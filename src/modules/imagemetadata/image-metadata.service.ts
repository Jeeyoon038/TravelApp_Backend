// src/modules/image-metadata/image-metadata.service.ts

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageData, ImageDataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(ImageData.name) private imageModel: Model<ImageDataDocument>,
  ) {}

  /**
   * Creates multiple ImageData documents.
   */
  async createMany(imageList: CreateImageMetadataDto[]): Promise<ImageData[]> {
    try {
      const formattedList = imageList.map(image => ({
        ...image,
        taken_at: image.taken_at ? new Date(image.taken_at) : null,
      }));
      
      return await this.imageModel.insertMany(formattedList, {
        ordered: false, // Continues inserting even if some documents fail
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Some images already exist');
      }
      console.error('Error creating images:', error);
      throw new BadRequestException('Failed to create images');
    }
  }

  /**
   * Other service methods (findByTripId, findAll, findOne, delete, deleteByTripId) remain unchanged.
   */
}
