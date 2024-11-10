// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Req,
    UseGuards,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { User } from './user.interface';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('login')
    @UseGuards(AuthGuard)
    login(@Req() request: Request) {
      if (!request.user) {
        throw new UnauthorizedException('User not found');
      }
      const token = this.authService.generateToken(request.user.email);
      return { access_token: token };
    }
  }
  