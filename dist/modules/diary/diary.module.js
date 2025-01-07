"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trip_schema_1 = require("../trips/schemas/trip.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const diary_controller_1 = require("./diary.controller");
const diary_service_1 = require("./diary.service");
const diary_schema_1 = require("./schemas/diary.schema");
let DiaryModule = class DiaryModule {
};
exports.DiaryModule = DiaryModule;
exports.DiaryModule = DiaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: diary_schema_1.Diary.name, schema: diary_schema_1.DiarySchema },
                { name: trip_schema_1.Trip.name, schema: trip_schema_1.TripSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [diary_controller_1.DiaryController],
        providers: [diary_service_1.DiaryService],
    })
], DiaryModule);
//# sourceMappingURL=diary.module.js.map