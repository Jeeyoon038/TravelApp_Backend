import { Model } from 'mongoose';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleUser } from 'src/modules/google-user/schemas/google-user.schema';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private googleUserModel;
    constructor(googleUserModel: Model<GoogleUser>);
    validate(request: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
