// src/modules/diary/diary.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from '../trips/schemas/trip.schema';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { Diary, DiarySchema } from './schemas/diary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Diary.name, schema: DiarySchema },
      { name: Trip.name, schema: TripSchema },
    ]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
