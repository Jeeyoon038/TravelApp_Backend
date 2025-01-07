// src/modules/google-user/google-user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserSchema } from './schemas/google-user.schema';
import { GoogleUserService } from './google-user.service';
import { GoogleUserController } from './google-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoogleUser.name, schema: GoogleUserSchema }]),
  ],
  providers: [GoogleUserService],
  controllers: [GoogleUserController],
  exports: [GoogleUserService], // so AuthModule can use it if needed
})
export class GoogleUserModule {}
