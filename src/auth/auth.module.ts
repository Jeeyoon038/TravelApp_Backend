// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleUser, GoogleUserSchema } from '../modules/google-user/schemas/google-user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    MongooseModule.forFeature([
      { name: 'GoogleUser', schema: GoogleUserSchema }  // Note: using string 'GoogleUser'
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    GoogleStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}