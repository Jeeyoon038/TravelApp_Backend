import { ConfigService } from '@nestjs/config';
export declare class DatabaseConfig {
    private configService;
    constructor(configService: ConfigService);
    get uri(): string;
}
