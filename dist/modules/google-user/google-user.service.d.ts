import { GoogleUser, GoogleUserDocument } from './schemas/google-user.schema';
import { Model } from 'mongoose';
export declare class GoogleUserService {
    private readonly googleUserModel;
    constructor(googleUserModel: Model<GoogleUserDocument>);
    findByEmail(email: string): Promise<GoogleUser>;
    create(email: string, googleId: string, displayName: string, firstName?: string, lastName?: string, photo?: string, accessToken?: string): Promise<GoogleUser>;
}
