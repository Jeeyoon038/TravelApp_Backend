import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { HealthModule } from './health/health.module';
import { GoogleUserModule } from './modules/google-user/google-user.module';
import { GoogleUser, GoogleUserSchema } from './modules/google-user/schemas/google-user.schema';
import { ImageMetadataModule } from './modules/imagemetadata/image-metadata.module';
import { TripsModule } from './modules/trips/trips.module';
import { UploadModule } from './modules/uploadImage/upload.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('Connecting to MongoDB at:', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Load JWT_SECRET from .env
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema }
    ]),
    HealthModule,
    AuthModule,
    UsersModule,
    TripsModule,
    ImageMetadataModule,
    UploadModule,
    GoogleUserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AppModule {}
