"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const google_strategy_1 = require("./auth/google.strategy");
const health_module_1 = require("./health/health.module");
const google_user_module_1 = require("./modules/google-user/google-user.module");
const google_user_schema_1 = require("./modules/google-user/schemas/google-user.schema");
const image_metadata_module_1 = require("./modules/imagemetadata/image-metadata.module");
const trips_module_1 = require("./modules/trips/trips.module");
const upload_module_1 = require("./modules/uploadImage/upload.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    console.log('Connecting to MongoDB at:', uri);
                    return { uri };
                },
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: google_user_schema_1.GoogleUser.name, schema: google_user_schema_1.GoogleUserSchema }
            ]),
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            trips_module_1.TripsModule,
            image_metadata_module_1.ImageMetadataModule,
            upload_module_1.UploadModule,
            image_metadata_module_1.ImageMetadataModule,
            google_user_module_1.GoogleUserModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, google_strategy_1.GoogleStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map