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
  taken_at: Date | null; // ISO string

  @IsOptional()
  @IsString()
  @IsUrl()
  image_url: string | null;

  @IsOptional()
  @IsString()
  displaySrc: string | null;

  @IsString()
  image_id: string;

  @IsOptional()
  @IsString()
  country: string | null;

  @IsOptional()
  @IsString()
  city: string | null;

  @IsOptional()
  @IsString()
  state: string | null;

  @IsOptional()
  @IsString()
  postalCode: string | null;

  @IsOptional()
  @IsString()
  street: string | null;
}
