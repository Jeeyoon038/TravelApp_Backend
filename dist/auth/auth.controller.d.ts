import { AuthService } from './auth.service';
import { CreateGoogleUserDto } from 'src/modules/google-user/dto/create-google-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleCallback(createGoogleUserDto: CreateGoogleUserDto): Promise<void>;
    googleLogin(googleId: string, email: string, name: string, avatarUrl: string): Promise<{
        accessToken: string;
    }>;
}
