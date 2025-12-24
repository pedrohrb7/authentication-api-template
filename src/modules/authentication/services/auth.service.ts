import { Injectable } from '@nestjs/common';

import { AuthResponse, IAuthService } from '../interfaces';
import { SignInDto } from '../dtos';
import { SignInAction } from './sign-in/sign-in.action';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly signInAction: SignInAction) {}

  signIn(data: SignInDto): AuthResponse {
    return this.signInAction.do(data);
  }

  signUp(data: any): void {
    // Implementation for sign-up
  }
}
