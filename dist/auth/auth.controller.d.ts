import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleLogin(googleId: string, email: string, name: string, avatarUrl: string): Promise<{
        accessToken: string;
    }>;
}
