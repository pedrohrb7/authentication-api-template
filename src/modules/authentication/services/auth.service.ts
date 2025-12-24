import { Injectable } from '@nestjs/common';

interface IAuthService {
  signIn(data: any): void;
  signUp(data: any): void;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor() {}

  signIn(data: any): void {
    // Implementation for sign-in
  }

  signUp(data: any): void {
    // Implementation for sign-up
  }
}
