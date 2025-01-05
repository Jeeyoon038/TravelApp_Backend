// src/modules/image-metadata/schemas/image-metadata.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type ImageMetadataDocument = ImageMetadata & Document;

@Schema({ timestamps: true })
export class ImageMetadata {
  @Prop({ unique: true })
  image_id: number;

  @Prop({ required: true, type: Number })
  latitude: number;

  @Prop({ required: true, type: Number })
  longitude: number;

  @Prop({ required: true, type: Date })
  taken_at: Date;

  @Prop({ required: true })
 image_url: string;  // 이미지 URL 필드 추가
 
}

export const ImageMetadataSchema = SchemaFactory.createForClass(ImageMetadata);

// Auto-increment setup for image_id
ImageMetadataSchema.pre('save', async function(next) {
    if (this.isNew) {
      const ImageModel = this.constructor as Model<ImageMetadataDocument>;  // Add proper typing
      const lastImage = await ImageModel.findOne().sort({ image_id: -1 });
      this.image_id = lastImage ? lastImage.image_id + 1 : 1;
    }
    next();
  });