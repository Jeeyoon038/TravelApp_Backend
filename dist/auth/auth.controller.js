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
const google_auth_guard_1 = require("./google-auth.guard");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const google_user_schema_1 = require("../modules/google-user/schemas/google-user.schema");
const mongoose_2 = require("mongoose");
let AuthController = class AuthController {
    constructor(authService, configService, googleUserModel) {
        this.authService = authService;
        this.configService = configService;
        this.googleUserModel = googleUserModel;
    }
    googleAuth() {
    }
    async getUser(req) {
        console.log('1. Request received in getUser');
        console.log('2. Headers:', req.headers);
        const authHeader = req.headers.authorization;
        console.log('3. Authorization header:', authHeader);
        if (!authHeader?.startsWith('Bearer ')) {
            console.log('4. No Bearer token found');
            throw new common_1.UnauthorizedException();
        }
        const token = authHeader.split(' ')[1];
        console.log('5. Token extracted:', token);
        const userData = await this.googleUserModel.findOne({ googleId: token });
        console.log('6. User data found:', userData);
        if (!userData) {
            console.log('7. No user found');
            throw new common_1.UnauthorizedException();
        }
        console.log('8. Returning user data');
        return userData;
    }
    async googleAuthRedirect(req, res) {
        try {
            const user = req.user;
            console.log('Backend received user:', user);
            const redirectUrl = new URL('http://localhost:5173');
            redirectUrl.searchParams.set('email', user.email);
            redirectUrl.searchParams.set('name', user.displayName);
            redirectUrl.searchParams.set('photo', user.photo);
            console.log('Redirecting to:', redirectUrl.toString());
            res.redirect(redirectUrl.toString());
        }
        catch (error) {
            console.error('Auth error:', error);
            res.redirect('http://localhost:5173?error=auth_failed');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(2, (0, mongoose_1.InjectModel)(google_user_schema_1.GoogleUser.name)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService,
        mongoose_2.Model])
], AuthController);
//# sourceMappingURL=auth.controller.js.map