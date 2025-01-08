import { GoogleUser, GoogleUserDocument } from './schemas/google-user.schema';
import { Model } from 'mongoose';
export declare class GoogleUserService {
    private readonly googleUserModel;
    constructor(googleUserModel: Model<GoogleUserDocument>);
    findByEmail(email: string): Promise<GoogleUser | null>;
    create(email: string, googleId: string, displayName: string, firstName?: string, lastName?: string, photo?: string): Promise<GoogleUser>;
    createOrUpdateGoogleUser(googleId: string, email: string, displayName: string, photo?: string): Promise<GoogleUser>;
}
