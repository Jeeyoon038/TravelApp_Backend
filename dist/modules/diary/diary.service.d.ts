import { Model } from 'mongoose';
import { TripDocument } from '../trips/schemas/trip.schema';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary, DiaryDocument } from './schemas/diary.schema';
export declare class DiaryService {
    private diaryModel;
    private tripModel;
    constructor(diaryModel: Model<DiaryDocument>, tripModel: Model<TripDocument>);
    findAllDiaries(): Promise<Diary[]>;
    findAllDiariesForTrip(tripId: string): Promise<Diary[]>;
    createDiary(createDiaryDto: CreateDiaryDto): Promise<Diary>;
    updateDiary(tripId: string, diaryId: string, updateDiaryDto: UpdateDiaryDto): Promise<Diary>;
}
