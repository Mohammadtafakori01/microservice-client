// src/types.d.ts
import { User } from './auth/user.interface';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
