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
exports.DiaryController = void 0;
const common_1 = require("@nestjs/common");
const diary_service_1 = require("./diary.service");
const create_diary_dto_1 = require("./dto/create-diary.dto");
const update_diary_dto_1 = require("./dto/update-diary.dto");
let DiaryController = class DiaryController {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }
    async getAllDiaries() {
        return this.diaryService.findAllDiaries();
    }
    async getDiaries(tripId) {
        return this.diaryService.findAllDiariesForTrip(tripId);
    }
    async createDiary(tripId, createDiaryDto) {
        if (createDiaryDto.trip_id !== tripId) {
            throw new common_1.BadRequestException(`Trip ID in URL does not match trip_id in body`);
        }
        return this.diaryService.createDiary(createDiaryDto);
    }
    async updateDiary(tripId, diaryId, updateDiaryDto) {
        return this.diaryService.updateDiary(tripId, diaryId, updateDiaryDto);
    }
};
exports.DiaryController = DiaryController;
__decorate([
    (0, common_1.Get)('diaries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getAllDiaries", null);
__decorate([
    (0, common_1.Get)('trips/:trip_id/diaries'),
    __param(0, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getDiaries", null);
__decorate([
    (0, common_1.Post)('trips/:trip_id/diaries'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('trip_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_diary_dto_1.CreateDiaryDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "createDiary", null);
__decorate([
    (0, common_1.Put)('trips/:trip_id/diaries/:diary_id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('trip_id')),
    __param(1, (0, common_1.Param)('diary_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_diary_dto_1.UpdateDiaryDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "updateDiary", null);
exports.DiaryController = DiaryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [diary_service_1.DiaryService])
], DiaryController);
//# sourceMappingURL=diary.controller.js.map