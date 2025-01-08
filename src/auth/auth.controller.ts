// src/auth/auth.controller.ts

import { BadRequestException, Body, Controller, Get, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateGoogleUserDto } from 'src/modules/google-user/dto/create-google-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('google/callback')
  async googleCallback(@Body() createGoogleUserDto: CreateGoogleUserDto) {
    if (!createGoogleUserDto.googleId || !createGoogleUserDto.email) {
      throw new BadRequestException('Google ID and email are required');
    }

    return this.authService.createOrUpdateGoogleUser(createGoogleUserDto);
  }

  
  /**
   * Endpoint to handle Google Login.
   * Expects query parameters like googleId, email, name, avatarUrl.
   */
  @Get('google-login')
  async googleLogin(
    @Query('googleId') googleId: string,
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('avatarUrl') avatarUrl: string,
  ): Promise<{ accessToken: string }> {
    if (!googleId || !email) {
      throw new UnauthorizedException('Invalid Google user data');
    }

    return this.authService.googleLogin({ googleId, email, name, avatarUrl });
  }
}
