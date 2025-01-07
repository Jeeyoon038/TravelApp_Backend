import { GoogleUserService } from './google-user.service';
export declare class GoogleUserController {
    private readonly googleUserService;
    constructor(googleUserService: GoogleUserService);
    create(body: {
        email: string;
        googleId: string;
        displayName: string;
        firstName?: string;
        lastName?: string;
        photo?: string;
        accessToken?: string;
    }): Promise<import("./schemas/google-user.schema").GoogleUser>;
    findByEmail(email: string): Promise<import("./schemas/google-user.schema").GoogleUser>;
}
