//auth.controller.ts
import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { GoogleUser } from '../modules/google-user/schemas/google-user.schema';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @InjectModel(GoogleUser.name) 
    private readonly googleUserModel: Model<GoogleUser>
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Initiates Google OAuth
  }

  @Get('user')
  async getUser(@Req() req) {
    console.log('1. Request received in getUser');
    console.log('2. Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    console.log('3. Authorization header:', authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('4. No Bearer token found');
      throw new UnauthorizedException();
    }
    
    const token = authHeader.split(' ')[1];
    console.log('5. Token extracted:', token);
    
    const userData = await this.googleUserModel.findOne({ googleId: token });
    console.log('6. User data found:', userData);
    
    if (!userData) {
      console.log('7. No user found');
      throw new UnauthorizedException(); 
    }
    
    console.log('8. Returning user data');
    return userData;
  }


  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = req.user;
      console.log('Backend received user:', user);
  
      const redirectUrl = new URL('http://localhost:5173');
      redirectUrl.searchParams.set('email', user.email);
      redirectUrl.searchParams.set('name', user.displayName);
      redirectUrl.searchParams.set('photo', user.photo);
  
      console.log('Redirecting to:', redirectUrl.toString());
      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('Auth error:', error);
      res.redirect('http://localhost:5173?error=auth_failed');
    }
  }
}