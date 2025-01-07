import { NestFactory } from '@nestjs/core';
import * as serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // 환경변수로 프론트엔드 URL 관리
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init(); // 서버 초기화
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};
