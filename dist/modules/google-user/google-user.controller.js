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
exports.GoogleUserController = void 0;
const common_1 = require("@nestjs/common");
const google_user_service_1 = require("./google-user.service");
let GoogleUserController = class GoogleUserController {
    constructor(googleUserService) {
        this.googleUserService = googleUserService;
    }
    async create(body) {
        const { email, googleId, displayName, photo, } = body;
        return this.googleUserService.create(email, googleId, displayName, photo);
    }
    async findByEmail(email) {
        console.log('email:', email);
        return this.googleUserService.findByEmail(email);
    }
};
exports.GoogleUserController = GoogleUserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogleUserController.prototype, "findByEmail", null);
exports.GoogleUserController = GoogleUserController = __decorate([
    (0, common_1.Controller)('google-users'),
    __metadata("design:paramtypes", [google_user_service_1.GoogleUserService])
], GoogleUserController);
//# sourceMappingURL=google-user.controller.js.map