import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  handleRequest(err: any, user: any, info: any, context: any) {
    console.log('GoogleAuthGuard - Handle Request:', { err, user, info });
    if (err || !user) {
      throw err || new Error('User not found');
    }
    return user;  // Remove the access_token assignment
  }
}