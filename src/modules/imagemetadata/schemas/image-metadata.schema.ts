import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop({ 
    type: String, 
    required: true, 
    unique: true,
    default: () => `img_${uuidv4()}`  // Auto-generate image_id
  })
  image_id: string;

  @Prop({ type: String, ref: 'Trip', required: true })
  trip_id: string;

  @Prop({ required: true })
  image_url: string;

  @Prop({ type: Number, default: null })
  latitude: number | null;

  @Prop({ type: Number, default: null })
  longitude: number | null;

  @Prop({ type: Date, default: null })
  taken_at: Date | null;

  @Prop({ type: String, default: null })
  country: string | null;

  @Prop({ type: String, default: null })
  city: string | null;

  @Prop({ type: String, default: null })
  state: string | null;

  @Prop({ type: String, default: null })
  postal_code: string | null;

  @Prop({ type: String, default: null })
  street: string | null;
}

export const ImageSchema = SchemaFactory.createForClass(Image);