import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './google-user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(GoogleUser.name)
    private googleUserModel: Model<GoogleUser>,
    private jwtService: JwtService
  ) {}

  async googleLogin(user: any) {
    try {
      // Find or create user
      let googleUser = await this.googleUserModel.findOne({ 
        googleId: user.googleId 
      });

      if (!googleUser) {
        googleUser = new this.googleUserModel({
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture
        });
        await googleUser.save();
      }

      // Generate JWT token
      const payload = { 
        sub: googleUser._id, 
        email: googleUser.email, 
        name: googleUser.name 
      };

      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          profilePicture: googleUser.profilePicture
        }
      };
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Failed to process Google login');
    }
  }
}