// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser, GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(GoogleUser.name) private googleUserModel: Model<GoogleUserDocument>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async googleLogin(user: {
    googleId: string;
    email: string;
    name: string;
    avatarUrl: string;
  }): Promise<{ accessToken: string }> {
    let existingUser = await this.googleUserModel.findOne({ googleId: user.googleId }).exec();

    if (!existingUser) {
      existingUser = await this.googleUserModel.create({
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      });
    }

    const payload = { sub: existingUser._id, email: existingUser.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
