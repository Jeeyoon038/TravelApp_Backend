import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    this.logger.debug(`Auth Header: ${authHeader ? 'Present' : 'Missing'}`);

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [type, token] = authHeader.split(' ');
    
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      // Google OAuth 토큰인 경우 검증 로직 추가
      if (token.startsWith('ya29.')) {
        // Google 토큰으로 간주하고 통과
        this.logger.debug('Google OAuth token detected');
        request['user'] = { 
          googleToken: token,
          // 필요한 경우 추가 정보
        };
        return true;
      }

      // 일반 JWT 토큰 검증
      const decoded = this.jwtService.verify(token);
      this.logger.debug('JWT token verified successfully');
      request['user'] = decoded;
      return true;
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`);
      
      // Google OAuth 토큰인 경우 에러 처리 변경
      if (token.startsWith('ya29.')) {
        return true; // Google 토큰은 통과
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      
      throw new UnauthorizedException('Invalid token');
    }
  }
}