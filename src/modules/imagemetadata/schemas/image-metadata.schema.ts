// src/modules/image-metadata/schemas/image-metadata.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageMetadataDocument = ImageMetadata & Document;

@Schema({ timestamps: true })
export class ImageMetadata {
  @Prop({ required: false })
  latitude: number | null;

  @Prop({ required: false })
  longitude: number | null;

  @Prop({ required: false })
  taken_at: string | null;

  @Prop({ required: true })
  image_url: string;

  @Prop({ required: true, unique: true })
  image_id: string;
}

export const ImageMetadataSchema = SchemaFactory.createForClass(ImageMetadata);
