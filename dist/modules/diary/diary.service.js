"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_schema_1 = require("../trips/schemas/trip.schema");
const diary_schema_1 = require("./schemas/diary.schema");
let DiaryService = class DiaryService {
    constructor(diaryModel, tripModel) {
        this.diaryModel = diaryModel;
        this.tripModel = tripModel;
    }
    async findAllDiaries() {
        return this.diaryModel.find().exec();
    }
    async findAllDiariesForTrip(tripId) {
        if (!mongoose_2.Types.ObjectId.isValid(tripId)) {
            throw new common_1.NotFoundException(`Trip with id ${tripId} not found`);
        }
        const tripExists = await this.tripModel.exists({ _id: tripId });
        if (!tripExists) {
            throw new common_1.NotFoundException(`Trip with id ${tripId} not found`);
        }
        return this.diaryModel.find({ trip_id: tripId }).exec();
    }
    async createDiary(createDiaryDto) {
        const { trip_id, date, content } = createDiaryDto;
        if (!mongoose_2.Types.ObjectId.isValid(trip_id)) {
            throw new common_1.NotFoundException(`Trip with id ${trip_id} not found`);
        }
        const tripExists = await this.tripModel.exists({ _id: trip_id });
        if (!tripExists) {
            throw new common_1.NotFoundException(`Trip with id ${trip_id} not found`);
        }
        const existingDiary = await this.diaryModel.findOne({ trip_id, date }).exec();
        if (existingDiary) {
            throw new common_1.BadRequestException(`Diary for date ${date} already exists for this trip`);
        }
        const createdDiary = new this.diaryModel({ trip_id, date, content });
        return createdDiary.save();
    }
    async updateDiary(tripId, diaryId, updateDiaryDto) {
        if (!mongoose_2.Types.ObjectId.isValid(tripId)) {
            throw new common_1.NotFoundException(`Trip with id ${tripId} not found`);
        }
        if (!mongoose_2.Types.ObjectId.isValid(diaryId)) {
            throw new common_1.NotFoundException(`Diary with id ${diaryId} not found`);
        }
        const tripExists = await this.tripModel.exists({ _id: tripId });
        if (!tripExists) {
            throw new common_1.NotFoundException(`Trip with id ${tripId} not found`);
        }
        const updatedDiary = await this.diaryModel.findOneAndUpdate({ _id: diaryId, trip_id: tripId }, { content: updateDiaryDto.content }, { new: true }).exec();
        if (!updatedDiary) {
            throw new common_1.NotFoundException(`Diary with id ${diaryId} for trip ${tripId} not found`);
        }
        return updatedDiary;
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(diary_schema_1.Diary.name)),
    __param(1, (0, mongoose_1.InjectModel)(trip_schema_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DiaryService);
//# sourceMappingURL=diary.service.js.map