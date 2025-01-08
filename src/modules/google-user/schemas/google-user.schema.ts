// src/modules/google-user/schemas/google-user.schema.ts

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

  @Prop()
  avatarUrl: string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
