import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Express } from 'express';
import { s3Client } from '../../config/aws.config';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    console.log(`Uploading file: ${fileName}`);

    // Log AWS credentials
    console.log('AWS Credentials:', {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      region: process.env.AWS_REGION,
    });

    // Verify AWS credentials
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new InternalServerErrorException('AWS credentials are not set');
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    });

    try {
      await s3Client.send(command);
      console.log(`File uploaded successfully: ${fileName}`);
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new InternalServerErrorException('Failed to upload image to S3');
    }
  }
}