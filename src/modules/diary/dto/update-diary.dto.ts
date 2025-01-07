// src/modules/diary/dto/update-diary.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDiaryDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
