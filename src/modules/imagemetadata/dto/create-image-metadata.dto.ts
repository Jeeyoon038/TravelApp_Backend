// src/modules/image-metadata/dto/create-image-metadata.dto.ts

import { IsNumber, IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateImageMetadataDto {
  @IsOptional()
  @IsNumber()
  latitude: number | null;

  @IsOptional()
  @IsNumber()
  longitude: number | null;

  @IsOptional()
  @IsDateString()
  taken_at: string | null; // ISO string

  @IsString()
  @IsUrl()
  image_url: string;

  @IsString()
  image_id: string;
}
