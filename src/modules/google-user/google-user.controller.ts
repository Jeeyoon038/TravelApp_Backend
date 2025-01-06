// src/google-user/google-user.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GoogleUserService } from './google-user.service';

@Controller('google-users')
export class GoogleUserController {
  constructor(private googleUserService: GoogleUserService) {}

  /**
   * 새로운 GoogleUser 생성
   * @param body { email: string, googleId: string }
   * @returns 생성된 GoogleUser
   */
  @Post()
  async create(@Body() body: { email: string; googleId: string }) {
    const { email, googleId } = body;
    return this.googleUserService.create(email, googleId);
  }

  /**
   * 이메일을 기반으로 GoogleUser 찾기
   * @param email 사용자 이메일
   * @returns GoogleUser
   */
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.googleUserService.findByEmail(email);
  }
}
