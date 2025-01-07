import { Model } from 'mongoose';
import { GoogleUser, GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';
export declare class AuthService {
    private readonly googleUserModel;
    constructor(googleUserModel: Model<GoogleUserDocument>);
    googleLogin(googleUser: GoogleUser): Promise<{
        user: {
            googleId: string;
            email: string;
            name: string;
            photo: string;
        };
    }>;
}
