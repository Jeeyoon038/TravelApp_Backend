// src/modules/google-user/schemas/google-user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GoogleUserDocument = HydratedDocument<GoogleUser>;

@Schema({ timestamps: true })
export class GoogleUser {
  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  photo: string;

  @Prop()
  accessToken: string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
