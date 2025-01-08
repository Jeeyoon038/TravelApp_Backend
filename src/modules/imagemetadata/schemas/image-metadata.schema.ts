// src/modules/image-metadata/schemas/imagedata.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsUrl, IsOptional, IsNumber, IsDateString } from 'class-validator';

export type ImageDataDocument = ImageData & Document;

@Schema({ timestamps: true })
export class ImageData {
  @Prop()
  latitude: number | null;

  @Prop()
  longitude: number | null;

  @Prop()
  taken_at: string | null;

  @Prop({ required: true, unique:true })
  image_url: string;

  @Prop({ required: true,unique :true})
  image_id: string;

  // @Prop()
  // __v: number;
}

export const ImageDataSchema = SchemaFactory.createForClass(ImageData);
