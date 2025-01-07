// src/modules/google-user/google-user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GoogleUserService } from './google-user.service';

@Controller('google-users')
export class GoogleUserController {
  constructor(private readonly googleUserService: GoogleUserService) {}

  @Post()
  async create(
    @Body()
    body: {
      email: string;
      googleId: string;
      displayName: string;
      firstName?: string;
      lastName?: string;
      photo?: string;
      accessToken?: string;
    },
  ) {
    const {
      email,
      googleId,
      displayName,
      firstName,
      lastName,
      photo,
      accessToken,
    } = body;

    return this.googleUserService.create(
      email,
      googleId,
      displayName,
      firstName,
      lastName,
      photo,
      accessToken,
    );
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    console.log('email:', email);
    return this.googleUserService.findByEmail(email);
  }
}
