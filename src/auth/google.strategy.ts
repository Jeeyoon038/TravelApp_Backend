// src/auth/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

// Import from modules/google-user
import { GoogleUser } from 'src/modules/google-user/schemas/google-user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(GoogleUser.name)
    private googleUserModel: Model<GoogleUser>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://13.61.86.122:3000/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      // Grab needed fields from the profile
      const googleId = profile.id;
      const emails = profile.emails || [];
      const photos = profile.photos || [];
      const displayName = profile.displayName || '';

      const email = emails.length ? emails[0].value : '';
      const firstName = profile.name?.givenName || '';
      const lastName = profile.name?.familyName || '';
      const photo = photos.length ? photos[0].value : '';

      if (!googleId) {
        console.error('No Google ID in profile, cannot proceed');
        return done(null, false);
      }

      let user = await this.googleUserModel.findOne({ googleId });
      if (!user) {
        user = await this.googleUserModel.create({
          googleId,
          email,
          displayName,
          firstName,
          lastName,
          photo,
        });
      }

      // Attach user to req.user
      return done(null, user);
    } catch (err) {
      console.error('Error in Google Strategy:', err);
      return done(err, false);
    }
  }
}
