// src/modules/diary/diary.controller.ts

import { BadRequestException, Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './schemas/diary.schema';

@Controller()
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  /**
   * 모든 다이어리를 가져옵니다.
   * GET /diaries
   */
  @Get('diaries')
  async getAllDiaries(): Promise<Diary[]> {
    return this.diaryService.findAllDiaries();
  }

  /**
   * 특정 여행의 모든 다이어리를 가져옵니다.
   * GET /trips/:trip_id/diaries
   * @param tripId 여행의 _id
   */
  @Get('trips/:trip_id/diaries')
  async getDiaries(@Param('trip_id') tripId: string): Promise<Diary[]> {
    return this.diaryService.findAllDiariesForTrip(tripId);
  }

  /**
   * 새로운 다이어리를 생성합니다.
   * POST /trips/:trip_id/diaries
   * @param tripId 여행의 _id
   * @param createDiaryDto 다이어리 생성 DTO
   */
  @Post('trips/:trip_id/diaries')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createDiary(
    @Param('trip_id') tripId: string,
    @Body() createDiaryDto: CreateDiaryDto
  ): Promise<Diary> {
    // URL의 trip_id와 DTO의 trip_id가 일치하는지 확인
    if (createDiaryDto.trip_id !== tripId) {
      throw new BadRequestException(`Trip ID in URL does not match trip_id in body`);
    }
    return this.diaryService.createDiary(createDiaryDto);
  }

  /**
   * 기존 다이어리를 업데이트합니다.
   * PUT /trips/:trip_id/diaries/:diary_id
   * @param tripId 여행의 _id
   * @param diaryId 다이어리의 _id
   * @param updateDiaryDto 다이어리 업데이트 DTO
   */
  @Put('trips/:trip_id/diaries/:diary_id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateDiary(
    @Param('trip_id') tripId: string,
    @Param('diary_id') diaryId: string,
    @Body() updateDiaryDto: UpdateDiaryDto
  ): Promise<Diary> {
    return this.diaryService.updateDiary(tripId, diaryId, updateDiaryDto);
  }
}
