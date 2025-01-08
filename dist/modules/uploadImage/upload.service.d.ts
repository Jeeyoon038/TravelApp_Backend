export declare class UploadService {
    private readonly s3Client;
    private readonly bucketName;
    private readonly region;
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
}
