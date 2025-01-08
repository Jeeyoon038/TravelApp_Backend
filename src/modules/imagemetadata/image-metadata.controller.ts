import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ImagesService } from './image-metadata.service';
import { CreateImageMetadataDto } from './dto/create-image-metadata.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

//@ApiTags('image-metadata')
@Controller('api/image-metadata')
@UseGuards(JwtAuthGuard) // Use only JwtAuthGuard
@ApiBearerAuth()
export class ImageMetadataController {
  private readonly logger = new Logger(ImageMetadataController.name);

  constructor(
    private readonly imagesService: ImagesService,
    private readonly jwtService: JwtService 
  ) {}

  @Post()
  @ApiOperation({ summary: 'Upload image metadata' })
  @ApiResponse({ status: 201, description: 'Image metadata uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadMetadata(@Body() images: CreateImageMetadataDto[]) {
    // Debug logging
    this.logger.debug(`Received metadata for ${images?.length} images`);
    
    if (!Array.isArray(images) || images.length === 0) {
      this.logger.warn('No image metadata provided');
      throw new BadRequestException('No image metadata provided');
    }

    try {
      this.logger.debug('Processing metadata upload request');
      const result = await this.imagesService.createMany(images);
      
      this.logger.debug('Metadata upload successful');
      return { 
        message: 'Image metadata uploaded successfully',
        data: result 
      };
    } catch (error: any) {
      this.logger.error('Failed to upload metadata', error.stack);
      throw new BadRequestException(
        error.message || 'Failed to upload image metadata'
      );
    }
  }
}