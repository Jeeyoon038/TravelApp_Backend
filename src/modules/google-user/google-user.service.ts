// src/modules/google-user/google-user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserDocument } from './schemas/google-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class GoogleUserService {
  constructor(
    @InjectModel(GoogleUser.name)
    private readonly googleUserModel: Model<GoogleUserDocument>,
  ) {}

  async findByEmail(email: string): Promise<GoogleUser> {
    const user = await this.googleUserModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`GoogleUser with email ${email} not found`);
    }
    return user;
  }

  async create(
    email: string,
    googleId: string,
    displayName: string,
    firstName?: string,
    lastName?: string,
    photo?: string,
    accessToken?: string,
  ): Promise<GoogleUser> {
    const createdUser = new this.googleUserModel({
      googleId,
      email,
      displayName,
      firstName,
      lastName,
      photo,
      accessToken,
    });
    return createdUser.save();
  }
}
