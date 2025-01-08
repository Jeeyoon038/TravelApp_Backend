// src/modules/imagemetadata/image-metadata.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageMetadataController } from './image-metadata.controller';
import { ImagesService } from './image-metadata.service';
import { ImageData, ImageDataSchema } from './schemas/image-metadata.schema';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ImageData.name, schema: ImageDataSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Ensure JWT_SECRET is set in .env
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [ImageMetadataController],
  providers: [ImagesService, JwtAuthGuard,{
    provide: 'JWT_SECRET',
    useFactory: (configService: ConfigService) => configService.get('JWT_SECRET'),
    inject: [ConfigService],
  },], // Provide JwtAuthGuard here
  exports: [ImagesService],
})
export class ImageMetadataModule {}
