import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GoogleStrategy } from './google.strategy';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleUser, GoogleUserSchema } from './google-user.schema';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'your_jwt_secret'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    // Register Mongoose schema for GoogleUser
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy, 
    GoogleAuthGuard, 
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule {}