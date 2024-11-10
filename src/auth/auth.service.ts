// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';

interface StoredUser {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: { [key: string]: StoredUser } = {};

  constructor(private jwtService: JwtService) {
    this.loadUsers();
  }

  private loadUsers() {
    const filePath = path.join(__dirname, 'users.json');
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      this.users = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading users.json: ${error.message}`);
      this.users = {};
    }
  }

  validateUser(email: string, password: string): boolean {
    const user = this.users['admin'];
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  }

  generateToken(email: string): string {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
