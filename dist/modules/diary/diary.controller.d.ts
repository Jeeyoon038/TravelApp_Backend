import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './schemas/diary.schema';
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    getAllDiaries(): Promise<Diary[]>;
    getDiaries(tripId: string): Promise<Diary[]>;
    createDiary(tripId: string, createDiaryDto: CreateDiaryDto): Promise<Diary>;
    updateDiary(tripId: string, diaryId: string, updateDiaryDto: UpdateDiaryDto): Promise<Diary>;
}
