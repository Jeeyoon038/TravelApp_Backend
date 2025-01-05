import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleUser } from './google-user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private jwtService: JwtService,
    @InjectModel(GoogleUser.name) 
    private googleUserModel: Model<GoogleUser>
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string, 
    refreshToken: string, 
    profile: any,
    done: VerifyCallback
  ) : Promise<any>{
    try {
      const { id, emails, displayName, photos } = profile;
  
      const user = await this.googleUserModel.findOne({ googleId: id });
      if (!user) {
        const newUser = new this.googleUserModel({
          googleId: id,
          email: emails[0].value,
          displayName,
          photo: photos[0].value,
        });
        await newUser.save();
        return done(null, newUser);
      }
      return done(null, user);
    } catch (err) {
      console.error('Error in Google Strategy:', err);
      return done(err, false);
    }
  }
}