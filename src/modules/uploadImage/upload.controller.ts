//upload.controller.ts
import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Multer를 사용하여 파일 업로드
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not provided!');
    }

    
    const imageUrl = await this.uploadService.uploadImage(file);
    return { imageUrl }; // 업로드된 이미지의 URL 반환
  }
}
