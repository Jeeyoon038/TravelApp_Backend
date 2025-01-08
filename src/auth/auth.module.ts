// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleUserModule } from '../modules/google-user/google-user.module';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported for environment variables
    GoogleUserModule, // Import GoogleUserModule for GoogleUserService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Ensure JWT_SECRET is in .env
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService,JwtModule], // Export AuthService if needed elsewhere
})
export class AuthModule {}
