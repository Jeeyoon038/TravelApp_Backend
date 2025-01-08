// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser, GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';
import { CreateGoogleUserDto } from 'src/modules/google-user/dto/create-google-user.dto';
import { GoogleUserService } from 'src/modules/google-user/google-user.service';

@Injectable()
export class AuthService {
  createOrUpdateGoogleUser(createGoogleUserDto: CreateGoogleUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(GoogleUser.name) private googleUserModel: Model<GoogleUserDocument>,
    private readonly jwtService: JwtService,
    private readonly googleUserService: GoogleUserService, // Inject JwtService
  ) {}


  async handleGoogleUser(
    googleId: string,
    email: string,
    displayName: string,
    photo?: string,
  ) {
    return this.googleUserService.createOrUpdateGoogleUser(
      googleId,
      email,
      displayName,
      photo,
    );
  }

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
