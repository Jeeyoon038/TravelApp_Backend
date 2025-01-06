import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Express } from 'express';
import { s3Client } from '../../config/aws.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Generate a unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    console.log(`Starting upload for file: ${fileName}`);

    // Verify AWS configuration
    if (!process.env.AWS_ACCESS_KEY_ID || 
        !process.env.AWS_SECRET_ACCESS_KEY || 
        !process.env.AWS_S3_BUCKET_NAME || 
        !process.env.AWS_REGION) {
      console.error('Missing AWS configuration:', {
        hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
        hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
        hasBucketName: !!process.env.AWS_S3_BUCKET_NAME,
        hasRegion: !!process.env.AWS_REGION,
      });
      throw new InternalServerErrorException('AWS configuration is incomplete');
    }

    try {
      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `uploads/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });

      await s3Client.send(command);
      
      const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
      console.log(`File uploaded successfully. URL: ${imageUrl}`);
      
      return imageUrl;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new InternalServerErrorException(
        `Failed to upload image: ${error.message}`
      );
    }
  }
}