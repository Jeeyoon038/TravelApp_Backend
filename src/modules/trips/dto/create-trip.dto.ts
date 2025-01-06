// src/modules/trips/dto/create-trip.dto.ts
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateTripDto {
 
  @IsString()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;  // Allow both string and Date

  @IsDateString()
  end_date: string;

  @IsArray()
  @IsString({ each: true })
  image_urls: string[];

  @IsArray()
  @IsString({ each: true })
  member_google_ids: string[];
}