// src/modules/diary/schemas/diary.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Trip } from '../../trips/schemas/trip.schema';

export type DiaryDocument = Diary & Document;

@Schema({ timestamps: true })
export class Diary {
  @Prop({ type: Types.ObjectId, ref: Trip.name, required: true })
  trip_id: Types.ObjectId;

  @Prop({ required: true })
  date: string; // 'YYYY-MM-DD'

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId; // New field for author
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
