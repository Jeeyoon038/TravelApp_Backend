import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageMetadata, ImageMetadataDocument } from './schemas/image-metadata.schema';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(ImageMetadata.name) private imageModel: Model<ImageMetadataDocument>,
  ) {}

  async create(createImageDto: CreateImageMetadataDto): Promise<ImageMetadata> {
    try {
      const createdImage = new this.imageModel({
        ...createImageDto,
        taken_at: createImageDto.taken_at ? new Date(createImageDto.taken_at) : null
      });
      return await createdImage.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Image with this image_id already exists');
      }
      console.error('Error creating image:', error);
      throw new BadRequestException('Failed to create image');
    }
  }

  async findByTripId(tripId: string): Promise<ImageMetadata[]> {
    console.log('Service: Finding images for trip:', tripId); // Debug log
    const images = await this.imageModel.find({ trip_id: tripId }).exec();
    if (!images.length) {
      throw new NotFoundException(`No images found for trip ${tripId}`);
    }
    return images;
  }

  async findAll(): Promise<ImageMetadata[]> {
    return this.imageModel.find().exec();
  }

  async findOne(imageId: string): Promise<ImageMetadata> {
    const image = await this.imageModel
      .findOne({ image_id: imageId })
      .exec();
    
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    return image;
  }

  async createMany(imageList: CreateImageMetadataDto[]): Promise<ImageMetadata[]> {
    try {
      const formattedList = imageList.map(image => ({
        ...image,
        taken_at: image.taken_at ? new Date(image.taken_at) : null
      }));
      
      return await this.imageModel.insertMany(formattedList, {
        ordered: false // Continues inserting even if some documents fail
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Some images already exist');
      }
      throw new BadRequestException('Failed to create images');
    }
  }

  async delete(imageId: string): Promise<ImageMetadata> {
    const deletedImage = await this.imageModel
      .findOneAndDelete({ image_id: imageId })
      .exec();
      
    if (!deletedImage) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    return deletedImage;
  }

  async deleteByTripId(tripId: string): Promise<{ deletedCount: number }> {
    const result = await this.imageModel
      .deleteMany({ trip_id: tripId })
      .exec();
      
    return { deletedCount: result.deletedCount || 0 };
  }
}