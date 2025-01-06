import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TripDocument = Trip & Document;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ 
    type: String, 
    required: true, 
    unique: true, 
    default: () => `trip_${uuidv4()}`
  })
  trip_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ type: [String], default: [] })
  image_urls: string[];

  @Prop({ type: [String], default: [] })
  member_google_ids: string[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);