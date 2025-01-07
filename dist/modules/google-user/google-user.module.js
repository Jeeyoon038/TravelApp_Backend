"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const google_user_schema_1 = require("./schemas/google-user.schema");
const google_user_service_1 = require("./google-user.service");
const google_user_controller_1 = require("./google-user.controller");
let GoogleUserModule = class GoogleUserModule {
};
exports.GoogleUserModule = GoogleUserModule;
exports.GoogleUserModule = GoogleUserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: google_user_schema_1.GoogleUser.name, schema: google_user_schema_1.GoogleUserSchema }]),
        ],
        providers: [google_user_service_1.GoogleUserService],
        controllers: [google_user_controller_1.GoogleUserController],
        exports: [google_user_service_1.GoogleUserService],
    })
], GoogleUserModule);
//# sourceMappingURL=google-user.module.js.map