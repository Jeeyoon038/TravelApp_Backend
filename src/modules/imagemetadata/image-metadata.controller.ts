// src/modules/image-metadata/image-metadata.controller.ts

import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as exifr from 'exifr'; // 서버에 exifr 패키지 설치 필요
import { ImageMetadataService } from './image-metadata.service';

@Controller('image-metadata')
export class ImageMetadataController {
  constructor(private readonly imageMetadataService: ImageMetadataService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('file'))
  async extractAndSaveMetadata(
    @UploadedFile() file: Express.Multer.File,
    @Body('image_url') image_url: string,
    @Body('image_id') image_id: string,
  ) {
    try {
      // 1. 파일에서 EXIF 데이터 추출
      const metadata = await exifr.parse(file.buffer, {
        tiff: true,
        exif: true,
        gps: true,
      });

      // 2. 메타데이터 객체 구성
      const metadataObject = {
        latitude: metadata?.latitude || null,
        longitude: metadata?.longitude || null,
        taken_at: metadata?.DateTimeOriginal || metadata?.CreateDate || new Date().toISOString(),
        image_url,
        image_id,
      };

      // 3. 데이터베이스에 저장
      const savedMetadata = await this.imageMetadataService.create(metadataObject);
      
      return savedMetadata;
    } catch (error) {
      console.error('Metadata extraction error:', error);
      throw new BadRequestException('Failed to extract or save image metadata');
    }
  }
}