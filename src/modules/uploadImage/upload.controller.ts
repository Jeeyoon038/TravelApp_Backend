import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image')) // Changed from 'file' to 'image' to match frontend
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not provided!');
    }

    try {
      const imageUrl = await this.uploadService.uploadImage(file);
      return { imageUrl };
    } catch (error) {
      console.error('Upload controller error:', error);
      throw error;
    }
  }
}