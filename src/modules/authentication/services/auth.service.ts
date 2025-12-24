import { Injectable } from '@nestjs/common';

import { AuthResponse, IAuthService } from '../interfaces';
import { SignInDto, SignUpDto } from '../dtos';
import { SignInAction } from './sign-in/sign-in.action';
import { SignUpAction } from './sign-up/sign-up.action';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly signInAction: SignInAction,
    private readonly signUpAction: SignUpAction,
  ) {}

  signIn(data: SignInDto): AuthResponse {
    return this.signInAction.do(data);
  }

  signUp(data: SignUpDto): void {
    return this.signUpAction.do(data);
  }
}
