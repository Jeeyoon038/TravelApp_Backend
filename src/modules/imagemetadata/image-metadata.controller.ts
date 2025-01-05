// src/modules/image-metadata/image-metadata.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImageMetadataService } from './image-metadata.service';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { ImageMetadata } from './schemas/image-metadata.schema';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image-metadata')
export class ImageMetadataController {
  constructor(private readonly imageMetadataService: ImageMetadataService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadPromises = files.map(file => this.imageMetadataService.UploadService(file));
    const imageUrls = await Promise.all(uploadPromises);
    return { imageUrls };
  }
  

  @Get()
  async findAll(): Promise<ImageMetadata[]> {
    return this.imageMetadataService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ImageMetadata> {
    return this.imageMetadataService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ImageMetadata> {
    return this.imageMetadataService.delete(id);
  }
}