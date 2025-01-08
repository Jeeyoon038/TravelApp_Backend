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

  async findByEmail(email: string): Promise<GoogleUser | null> {
    return this.googleUserModel.findOne({ email }).exec();
  }

  async create(
    email: string,
    googleId: string,
    displayName: string,
    firstName?: string,
    lastName?: string,
    photo?: string,
  ): Promise<GoogleUser> {
    const createdUser = new this.googleUserModel({
      googleId,
      email,
      name: displayName,
      avatarUrl: photo,
    });
    return createdUser.save();
  }

  /**
   * Create or update a Google user in the database.
   * @param googleId - The unique Google ID of the user.
   * @param email - The email address of the user.
   * @param displayName - The display name of the user.
   * @param photo - The profile photo URL of the user.
   */
  async createOrUpdateGoogleUser(
    googleId: string,
    email: string,
    displayName: string,
    photo?: string,
  ): Promise<GoogleUser> {
    const existingUser = await this.googleUserModel.findOne({ googleId }).exec();

    if (existingUser) {
      // Update existing user
      existingUser.email = email;
      existingUser.name = displayName;
      existingUser.photo = photo || existingUser.photo;
      return existingUser.save();
    }
  
    // Create new user
    const newUser = new this.googleUserModel({
      googleId,
      email,
      name: displayName,
      photo,
    });
  
    return newUser.save();
  }
}
