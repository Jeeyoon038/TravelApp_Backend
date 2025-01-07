// src/modules/diary/diary.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Trip, TripDocument } from '../trips/schemas/trip.schema';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary, DiaryDocument } from './schemas/diary.schema';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private diaryModel: Model<DiaryDocument>,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
  ) {}

  /**
   * 모든 다이어리를 가져옵니다.
   */
  async findAllDiaries(): Promise<Diary[]> {
    return this.diaryModel.find().exec();
  }

  /**
   * 특정 여행의 모든 다이어리를 가져옵니다.
   * @param tripId 여행의 _id
   */
  async findAllDiariesForTrip(tripId: string): Promise<Diary[]> {
    // tripId 유효성 검사
    if (!Types.ObjectId.isValid(tripId)) {
      throw new NotFoundException(`Trip with id ${tripId} not found`);
    }

    const tripExists = await this.tripModel.exists({ _id: tripId });
    if (!tripExists) {
      throw new NotFoundException(`Trip with id ${tripId} not found`);
    }

    return this.diaryModel.find({ trip_id: tripId }).exec();
  }

  /**
   * 새로운 다이어리를 생성합니다.
   * @param createDiaryDto 다이어리 생성 DTO
   */
  async createDiary(createDiaryDto: CreateDiaryDto): Promise<Diary> {
    const { trip_id, date, content } = createDiaryDto;

    // trip_id 유효성 검사
    if (!Types.ObjectId.isValid(trip_id)) {
      throw new NotFoundException(`Trip with id ${trip_id} not found`);
    }

    const tripExists = await this.tripModel.exists({ _id: trip_id });
    if (!tripExists) {
      throw new NotFoundException(`Trip with id ${trip_id} not found`);
    }

    // 동일 날짜에 이미 다이어리가 있는지 확인
    const existingDiary = await this.diaryModel.findOne({ trip_id, date }).exec();
    if (existingDiary) {
      throw new BadRequestException(`Diary for date ${date} already exists for this trip`);
    }

    const createdDiary = new this.diaryModel({ trip_id, date, content });
    return createdDiary.save();
  }

  /**
   * 기존 다이어리를 업데이트합니다.
   * @param tripId 여행의 _id
   * @param diaryId 다이어리의 _id
   * @param updateDiaryDto 다이어리 업데이트 DTO
   */
  async updateDiary(tripId: string, diaryId: string, updateDiaryDto: UpdateDiaryDto): Promise<Diary> {
    // tripId와 diaryId 유효성 검사
    if (!Types.ObjectId.isValid(tripId)) {
      throw new NotFoundException(`Trip with id ${tripId} not found`);
    }

    if (!Types.ObjectId.isValid(diaryId)) {
      throw new NotFoundException(`Diary with id ${diaryId} not found`);
    }

    // 여행 존재 여부 확인
    const tripExists = await this.tripModel.exists({ _id: tripId });
    if (!tripExists) {
      throw new NotFoundException(`Trip with id ${tripId} not found`);
    }

    // 다이어리 찾기 및 업데이트
    const updatedDiary = await this.diaryModel.findOneAndUpdate(
      { _id: diaryId, trip_id: tripId },
      { content: updateDiaryDto.content },
      { new: true },
    ).exec();

    if (!updatedDiary) {
      throw new NotFoundException(`Diary with id ${diaryId} for trip ${tripId} not found`);
    }

    return updatedDiary;
  }
}
