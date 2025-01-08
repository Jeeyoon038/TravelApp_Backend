import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser, GoogleUserDocument } from '../modules/google-user/schemas/google-user.schema';
import { CreateGoogleUserDto } from 'src/modules/google-user/dto/create-google-user.dto';
import { GoogleUserService } from 'src/modules/google-user/google-user.service';
export declare class AuthService {
    private googleUserModel;
    private readonly jwtService;
    private readonly googleUserService;
    createOrUpdateGoogleUser(createGoogleUserDto: CreateGoogleUserDto): void;
    constructor(googleUserModel: Model<GoogleUserDocument>, jwtService: JwtService, googleUserService: GoogleUserService);
    handleGoogleUser(googleId: string, email: string, displayName: string, photo?: string): Promise<GoogleUser>;
    googleLogin(user: {
        googleId: string;
        email: string;
        name: string;
        avatarUrl: string;
    }): Promise<{
        accessToken: string;
    }>;
}
