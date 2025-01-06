import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './image-metadata.controller';
import { ImagesService } from './image-metadata.service';
import { Image, ImageSchema } from './schemas/image-metadata.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Image.name, 
        schema: ImageSchema 
      }
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}