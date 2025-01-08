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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_google_user_dto_1 = require("../modules/google-user/dto/create-google-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleCallback(createGoogleUserDto) {
        if (!createGoogleUserDto.googleId || !createGoogleUserDto.email) {
            throw new common_1.BadRequestException('Google ID and email are required');
        }
        return this.authService.createOrUpdateGoogleUser(createGoogleUserDto);
    }
    async googleLogin(googleId, email, name, avatarUrl) {
        if (!googleId || !email) {
            throw new common_1.UnauthorizedException('Invalid Google user data');
        }
        return this.authService.googleLogin({ googleId, email, name, avatarUrl });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('google/callback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_google_user_dto_1.CreateGoogleUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)('google-login'),
    __param(0, (0, common_1.Query)('googleId')),
    __param(1, (0, common_1.Query)('email')),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Query)('avatarUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map