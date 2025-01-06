//image-metadata.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { ImagesService } from './image-metadata.service';
import { CreateImageDto } from './dto/create-image-metadata.dto';
import { Image } from './schemas/image-metadata.schema';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createImageDto: CreateImageDto): Promise<Image> {
    return this.imagesService.create(createImageDto);
  }

  @Post('batch')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() createImageDtos: CreateImageDto[]): Promise<Image[]> {
    return this.imagesService.createMany(createImageDtos);
  }

  @Get()
  async findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get(':imageId')
  async findOne(@Param('imageId') imageId: string): Promise<Image> {
    return this.imagesService.findOne(imageId);
  }

  @Get('trip/:tripId')
  async findByTripId(@Param('tripId') tripId: string): Promise<Image[]> {
    console.log('Finding images for trip:', tripId);
    return this.imagesService.findByTripId(tripId);
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('imageId') imageId: string): Promise<void> {
    await this.imagesService.delete(imageId);
  }

  @Delete('trip/:tripId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByTripId(@Param('tripId') tripId: string): Promise<void> {
    await this.imagesService.deleteByTripId(tripId);
  }
}