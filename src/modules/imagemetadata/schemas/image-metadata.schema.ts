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
  taken_at: Date | null;

  @Prop({ required: false })
  image_url: string | null;

  @Prop({ required: false })
  displaySrc: string | null;

  @Prop({ required: true, unique: true })
  image_id: string;

  @Prop({ required: false })
  country: string | null;

  @Prop({ required: false })
  city: string | null;

  @Prop({ required: false })
  state: string | null;

  @Prop({ required: false })
  postalCode: string | null;

  @Prop({ required: false })
  street: string | null;
}

export const ImageMetadataSchema = SchemaFactory.createForClass(ImageMetadata);
