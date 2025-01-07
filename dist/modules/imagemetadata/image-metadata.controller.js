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
exports.ImageMetadataController = void 0;
const common_1 = require("@nestjs/common");
const image_metadata_service_1 = require("./image-metadata.service");
const create_image_metadata_dto_1 = require("./dto/create-image-metadata.dto");
let ImageMetadataController = class ImageMetadataController {
    constructor(imageMetadataService) {
        this.imageMetadataService = imageMetadataService;
    }
    async create(createImageMetadataDto) {
        try {
            console.log('Received CreateImageMetadataDto:', createImageMetadataDto);
            return await this.imageMetadataService.create(createImageMetadataDto);
        }
        catch (error) {
            console.error('Error in ImageMetadataController.create:', error);
            throw error;
        }
    }
    async findAll() {
        return this.imageMetadataService.findAll();
    }
    async findOne(id) {
        return this.imageMetadataService.findOne(id);
    }
    async delete(id) {
        await this.imageMetadataService.delete(id);
    }
};
exports.ImageMetadataController = ImageMetadataController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_image_metadata_dto_1.CreateImageMetadataDto]),
    __metadata("design:returntype", Promise)
], ImageMetadataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageMetadataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageMetadataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageMetadataController.prototype, "delete", null);
exports.ImageMetadataController = ImageMetadataController = __decorate([
    (0, common_1.Controller)('image-metadata'),
    __metadata("design:paramtypes", [image_metadata_service_1.ImagesService])
], ImageMetadataController);
//# sourceMappingURL=image-metadata.controller.js.map