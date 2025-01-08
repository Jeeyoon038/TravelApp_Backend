import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';
export declare class AuthService {
    private googleUserModel;
    private readonly jwtService;
    constructor(googleUserModel: Model<GoogleUserDocument>, jwtService: JwtService);
    googleLogin(user: {
        googleId: string;
        email: string;
        name: string;
        avatarUrl: string;
    }): Promise<{
        accessToken: string;
    }>;
}
