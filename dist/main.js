"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const dotenv = require("dotenv");
const express = require("express");
const serverless = require("serverless-http");
const app_module_1 = require("./app.module");
dotenv.config();
const expressApp = express();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
    console.log('Application is running on port 3000');
}
bootstrap();
exports.handler = serverless(expressApp);
//# sourceMappingURL=main.js.map