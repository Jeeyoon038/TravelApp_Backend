import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { AppModule } from './app.module';

dotenv.config();
const expressApp = express();


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  



  app.enableCors({
    origin: 'https://travel-app-frontend-zeta.vercel.app', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    //allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT || 3000);
  console.log('Application is running on port 3000');

}
bootstrap();

export const handler = serverless(expressApp);
