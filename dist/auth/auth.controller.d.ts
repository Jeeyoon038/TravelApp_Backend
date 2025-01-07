import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../modules/google-user/schemas/google-user.schema';
import { Model } from 'mongoose';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    private readonly googleUserModel;
    constructor(authService: AuthService, configService: ConfigService, googleUserModel: Model<GoogleUser>);
    googleAuth(): void;
    getUser(req: any): Promise<import("mongoose").Document<unknown, {}, GoogleUser> & GoogleUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
}
