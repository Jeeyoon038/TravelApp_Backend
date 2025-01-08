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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_metadata_schema_1 = require("./schemas/image-metadata.schema");
let ImagesService = class ImagesService {
    constructor(imageModel) {
        this.imageModel = imageModel;
    }
    async createMany(imageList) {
        try {
            const formattedList = imageList.map(image => ({
                ...image,
                taken_at: image.taken_at ? new Date(image.taken_at) : null,
            }));
            return await this.imageModel.insertMany(formattedList, {
                ordered: false,
            });
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Some images already exist');
            }
            console.error('Error creating images:', error);
            throw new common_1.BadRequestException('Failed to create images');
        }
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(image_metadata_schema_1.ImageData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ImagesService);
//# sourceMappingURL=image-metadata.service.js.map