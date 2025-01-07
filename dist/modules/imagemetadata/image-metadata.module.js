"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMetadataModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_metadata_controller_1 = require("./image-metadata.controller");
const image_metadata_service_1 = require("./image-metadata.service");
const image_metadata_schema_1 = require("./schemas/image-metadata.schema");
let ImageMetadataModule = class ImageMetadataModule {
};
exports.ImageMetadataModule = ImageMetadataModule;
exports.ImageMetadataModule = ImageMetadataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: image_metadata_schema_1.ImageMetadata.name, schema: image_metadata_schema_1.ImageMetadataSchema }]),
        ],
        controllers: [image_metadata_controller_1.ImageMetadataController],
        providers: [image_metadata_service_1.ImagesService],
        exports: [image_metadata_service_1.ImagesService],
    })
], ImageMetadataModule);
//# sourceMappingURL=image-metadata.module.js.map