// src/google-user/google-user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserDocument } from './schemas/google-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class GoogleUserService {
  constructor(
    @InjectModel(GoogleUser.name) private googleUserModel: Model<GoogleUserDocument>,
  ) {}

  /**
   * 이메일을 기반으로 GoogleUser 찾기
   * @param email 사용자 이메일
   * @returns GoogleUser 문서
   */
  async findByEmail(email: string): Promise<GoogleUser> {
    const user = await this.googleUserModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`GoogleUser with email ${email} not found`);
    }
    return user;
  }

  /**
   * 새로운 GoogleUser 생성
   * @param email 사용자 이메일
   * @param googleId 구글 ID
   * @returns 생성된 GoogleUser 문서
   */
  async create(email: string, googleId: string): Promise<GoogleUser> {
    const createdUser = new this.googleUserModel({ email, googleId });
    return createdUser.save();
  }
}
