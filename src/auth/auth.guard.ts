// src/auth/auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Observable } from 'rxjs';
  import { User } from './user.interface';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
      }
  
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [email, password] = credentials.split(':');
  
      if (!email || !password) {
        throw new UnauthorizedException('Invalid authentication credentials');
      }
  
      const isValid = this.authService.validateUser(email, password);
  
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Attach user information to the request object
      const user: User = { email };
      request.user = user;
  
      return true;
    }
  }
  