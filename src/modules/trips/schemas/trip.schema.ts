import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';  // Add Model import

export type TripDocument = Trip & Document;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ unique: true })
  trip_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Date })
  start_date: Date;

  @Prop({ required: true, type: Date })
  end_date: Date;

  @Prop({ type: [String], default: [] })  // 이미지 URL 배열
  image_urls: string[];

  @Prop({ type: [String], default: [] })  // 멤버들의 Google ID 배열
  member_google_ids: string[];

}

export const TripSchema = SchemaFactory.createForClass(Trip);

// Auto-increment setup for trip_id
TripSchema.pre('save', async function(next) {
    if (this.isNew) {
      const Trip = this.constructor as Model<TripDocument>;  // Add proper typing
      const lastTrip = await Trip.findOne().sort({ trip_id: -1 });
      this.trip_id = lastTrip ? lastTrip.trip_id + 1 : 1;
    }
    next();
});

// Validation to ensure end_date is after start_date
TripSchema.pre('save', function(next) {
    if (this.end_date < this.start_date) {
      next(new Error('End date must be after start date'));
    }
    next();
});