"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_config_1 = require("../../config/aws.config");
let UploadService = class UploadService {
    async uploadImage(file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        console.log(`Uploading file: ${fileName}`);
        console.log('AWS Credentials:', {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            bucketName: process.env.AWS_S3_BUCKET_NAME,
            region: process.env.AWS_REGION,
        });
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new common_1.InternalServerErrorException('AWS credentials are not set');
        }
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        });
        try {
            await aws_config_1.s3Client.send(command);
            console.log(`File uploaded successfully: ${fileName}`);
            return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
        }
        catch (error) {
            console.error('Error uploading image to S3:', error);
            throw new common_1.InternalServerErrorException('Failed to upload image to S3');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map