// auth.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleUser, GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(GoogleUser.name)
    private readonly googleUserModel: Model<GoogleUserDocument>,
  ) {}

  /**
   * Called after Google OAuth Guard populates 'req.user'.
   * This method finds or creates the user in the DB.
   */
  async googleLogin(googleUser: GoogleUser) {
    try {
      // 1) Look up existing user by googleId
      let user = await this.googleUserModel.findOne({ googleId: googleUser.googleId });
      // 2) If user doesn't exist, create a new record
      if (!user) {
        user = new this.googleUserModel({
          googleId: googleUser.googleId,
          email: googleUser.email,
          displayName: googleUser.displayName,
          photo: googleUser.photo,
        });
        await user.save();
      }
      // 3) Return safe user data (or your own token logic)
      return {
        user: {
          googleId: user.googleId,
          email: user.email,
          name: user.displayName,
          photo: user.photo,
        },
      };
    } catch (error) {
      // 4) Catch any DB or other errors and throw a 500
      throw new InternalServerErrorException(error.message);
    }
  }
}
