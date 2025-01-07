import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { TripsModule } from './modules/trips/trips.module';
import { ImageMetadataModule } from './modules/imagemetadata/image-metadata.module';
import { UploadModule } from './modules/uploadImage/upload.module';
import { AuthModule } from './auth/auth.module';
import { GoogleUserModule } from './modules/google-user/google-user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { GoogleUser, GoogleUserSchema } from './modules/google-user/schemas/google-user.schema';

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
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema }
    ]),
    
    AuthModule,
    UsersModule,
    TripsModule,
    ImageMetadataModule,
    UploadModule,
    ImageMetadataModule,
    GoogleUserModule
    
    
  ],

  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AppModule {}