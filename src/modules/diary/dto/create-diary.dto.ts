// src/modules/diary/dto/create-diary.dto.ts

import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  @IsString()
  trip_id: string; // _id of the trip

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  date: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
