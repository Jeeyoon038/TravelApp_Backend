// src/modules/image-metadata/dto/create-image-metadata.dto.ts
import { IsNotEmpty, IsNumber, IsDate, IsString, IsUrl } from 'class-validator';

export class CreateImageMetadataDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsDate()
  taken_at: Date;

  @IsNotEmpty()
  @IsString()
  @IsUrl()  // URL 형식 검증
  image_url: string;
}