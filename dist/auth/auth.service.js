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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const google_user_schema_1 = require("../modules/google-user/schemas/google-user.schema");
const google_user_service_1 = require("../modules/google-user/google-user.service");
let AuthService = class AuthService {
    createOrUpdateGoogleUser(createGoogleUserDto) {
        throw new Error('Method not implemented.');
    }
    constructor(googleUserModel, jwtService, googleUserService) {
        this.googleUserModel = googleUserModel;
        this.jwtService = jwtService;
        this.googleUserService = googleUserService;
    }
    async handleGoogleUser(googleId, email, displayName, photo) {
        return this.googleUserService.createOrUpdateGoogleUser(googleId, email, displayName, photo);
    }
    async googleLogin(user) {
        let existingUser = await this.googleUserModel.findOne({ googleId: user.googleId }).exec();
        if (!existingUser) {
            existingUser = await this.googleUserModel.create({
                googleId: user.googleId,
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl,
            });
        }
        const payload = { sub: existingUser._id, email: existingUser.email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(google_user_schema_1.GoogleUser.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        google_user_service_1.GoogleUserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map