// src/modules/image-metadata/image-metadata.controller.ts

import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImagesService } from './image-metadata.service';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { ImageMetadata } from './schemas/image-metadata.schema';

@Controller('image-metadata')
export class ImageMetadataController {
  constructor(private readonly imageMetadataService: ImagesService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createImageMetadataDto: CreateImageMetadataDto): Promise<ImageMetadata> {
    try {
      console.log('Received CreateImageMetadataDto:', createImageMetadataDto); // Log incoming data
      return await this.imageMetadataService.create(createImageMetadataDto);
    } catch (error) {
      // Log the error details for debugging
      console.error('Error in ImageMetadataController.create:', error);
      throw error; // Re-throw to let NestJS handle the response
    }
  }
  



  @Get()
  async findAll(): Promise<ImageMetadata[]> {
    return this.imageMetadataService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ImageMetadata> { // Changed type to string
    return this.imageMetadataService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> { // Changed type to string and return type to void
    await this.imageMetadataService.delete(id);
  }
}
