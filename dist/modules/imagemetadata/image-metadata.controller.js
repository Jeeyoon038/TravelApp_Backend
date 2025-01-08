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
var ImageMetadataController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMetadataController = void 0;
const common_1 = require("@nestjs/common");
const image_metadata_service_1 = require("./image-metadata.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
let ImageMetadataController = ImageMetadataController_1 = class ImageMetadataController {
    constructor(imagesService, jwtService) {
        this.imagesService = imagesService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(ImageMetadataController_1.name);
    }
    async uploadMetadata(images) {
        this.logger.debug(`Received metadata for ${images?.length} images`);
        if (!Array.isArray(images) || images.length === 0) {
            this.logger.warn('No image metadata provided');
            throw new common_1.BadRequestException('No image metadata provided');
        }
        try {
            this.logger.debug('Processing metadata upload request');
            const result = await this.imagesService.createMany(images);
            this.logger.debug('Metadata upload successful');
            return {
                message: 'Image metadata uploaded successfully',
                data: result
            };
        }
        catch (error) {
            this.logger.error('Failed to upload metadata', error.stack);
            throw new common_1.BadRequestException(error.message || 'Failed to upload image metadata');
        }
    }
};
exports.ImageMetadataController = ImageMetadataController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload image metadata' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image metadata uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ImageMetadataController.prototype, "uploadMetadata", null);
exports.ImageMetadataController = ImageMetadataController = ImageMetadataController_1 = __decorate([
    (0, common_1.Controller)('api/image-metadata'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [image_metadata_service_1.ImagesService,
        jwt_1.JwtService])
], ImageMetadataController);
//# sourceMappingURL=image-metadata.controller.js.map