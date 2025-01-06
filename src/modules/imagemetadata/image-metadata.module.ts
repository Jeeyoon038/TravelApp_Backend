// src/modules/image-metadata/image-metadata.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageMetadataController } from './image-metadata.controller';
import { ImageMetadataService } from './image-metadata.service';
import { ImageMetadata, ImageMetadataSchema } from './schemas/image-metadata.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ImageMetadata.name, schema: ImageMetadataSchema }]),
  ],
  controllers: [ImageMetadataController],
  providers: [ImageMetadataService],
  exports: [ImageMetadataService], // Export if needed elsewhere
})
export class ImageMetadataModule {}
