// src/auth/auth.controller.ts

import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
