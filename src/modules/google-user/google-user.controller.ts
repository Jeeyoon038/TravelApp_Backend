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
      photo?: string; // Field name changed to match schema
    }, 
  ) {
    const {
      email,
      googleId,
      displayName,
      photo, // Match schema field name
    } = body;

    return this.googleUserService.create(
      email,
      googleId,
      displayName,
      photo, // Pass as avatarUrl
    );
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    console.log('email:', email);
    return this.googleUserService.findByEmail(email);
  }
}
