// src/modules/google-user/google-user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserSchema } from './schemas/google-user.schema';
import { GoogleUserService } from './google-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema },
    ]),
  ],
  providers: [GoogleUserService], // Add GoogleUserService to providers
  exports: [GoogleUserService, MongooseModule], // Export GoogleUserService and MongooseModule
})
export class GoogleUserModule {}
