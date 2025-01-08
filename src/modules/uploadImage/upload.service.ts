// src/services/upload.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand, S3Client, ObjectCannedACL } from '@aws-sdk/client-s3';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor() {
    if (
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_S3_BUCKET_NAME ||
      !process.env.AWS_REGION
    ) {
      throw new InternalServerErrorException('AWS credentials and configuration are not set');
    }

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    this.region = process.env.AWS_REGION;
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const timestamp = Date.now();
    const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
    const fileName = `${timestamp}-${sanitizedFileName}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ACL: ObjectCannedACL.public_read,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      await this.s3Client.send(command);
      const imageUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new InternalServerErrorException('Failed to upload image to S3');
    }
  }
}
