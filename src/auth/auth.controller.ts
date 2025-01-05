//autho.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Initiates Google OAuth
  }

  @Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleAuthRedirect(@Req() req, @Res() res: Response) {
  try {
    console.log('Google Callback Received:', req.user);

    // Generate or retrieve access token
    const { access_token, user } = await this.authService.googleLogin(req.user);

    console.log('Generated Access Token:', access_token);

    // Redirect directly to home page with query parameters
    const redirectUrl = new URL('http://localhost:5173/home');
    redirectUrl.searchParams.set('access_token', access_token);
    redirectUrl.searchParams.set('email', user.email);
    redirectUrl.searchParams.set('name', user.name);
    
    if (user.profilePicture) {
      redirectUrl.searchParams.set('profile_picture', user.profilePicture);
    }

    console.log('Redirecting to:', redirectUrl.toString());
    
    // Redirect to frontend home page with token and user info
    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Google auth error:', error);
    
    // Redirect with error to home page
    const errorRedirectUrl = new URL('http://localhost:5173/home');
    errorRedirectUrl.searchParams.set('error', 'Authentication failed');
    res.redirect(errorRedirectUrl.toString());
  }
}
}