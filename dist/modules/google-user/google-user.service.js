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
exports.GoogleUserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const google_user_schema_1 = require("./schemas/google-user.schema");
const mongoose_2 = require("mongoose");
let GoogleUserService = class GoogleUserService {
    constructor(googleUserModel) {
        this.googleUserModel = googleUserModel;
    }
    async findByEmail(email) {
        const user = await this.googleUserModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`GoogleUser with email ${email} not found`);
        }
        return user;
    }
    async create(email, googleId, displayName, firstName, lastName, photo, accessToken) {
        const createdUser = new this.googleUserModel({
            googleId,
            email,
            displayName,
            firstName,
            lastName,
            photo,
            accessToken,
        });
        return createdUser.save();
    }
};
exports.GoogleUserService = GoogleUserService;
exports.GoogleUserService = GoogleUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(google_user_schema_1.GoogleUser.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoogleUserService);
//# sourceMappingURL=google-user.service.js.map