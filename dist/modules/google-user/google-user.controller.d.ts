import { GoogleUserService } from './google-user.service';
export declare class GoogleUserController {
    private readonly googleUserService;
    constructor(googleUserService: GoogleUserService);
    create(body: {
        email: string;
        googleId: string;
        displayName: string;
        photo?: string;
    }): Promise<import("./schemas/google-user.schema").GoogleUser>;
    findByEmail(email: string): Promise<import("./schemas/google-user.schema").GoogleUser>;
}
