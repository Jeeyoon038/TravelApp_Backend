// src/modules/trips/dto/create-trip.dto.ts
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  start_date: Date;  // Allow both string and Date

  @IsNotEmpty()
  end_date: Date;    // Allow both string and Date

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image_urls?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  member_google_ids?: string[];
}