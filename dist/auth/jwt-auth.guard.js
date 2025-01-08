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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_2.Logger(JwtAuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        this.logger.debug(`Auth Header: ${authHeader ? 'Present' : 'Missing'}`);
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Invalid authorization format');
        }
        try {
            if (token.startsWith('ya29.')) {
                this.logger.debug('Google OAuth token detected');
                request['user'] = {
                    googleToken: token,
                };
                return true;
            }
            const decoded = this.jwtService.verify(token);
            this.logger.debug('JWT token verified successfully');
            request['user'] = decoded;
            return true;
        }
        catch (error) {
            this.logger.error(`Token verification failed: ${error.message}`);
            if (token.startsWith('ya29.')) {
                return true;
            }
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token has expired');
            }
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map