import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GoogleUserDocument = GoogleUser & Document;

@Schema({ timestamps: true })
export class GoogleUser {
  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop() // Field name changed to match DTO
  photo: string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
