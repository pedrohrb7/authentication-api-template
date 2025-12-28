import { Injectable } from '@nestjs/common';

import { SignInDto } from '../dtos/SignInDto.dto';
import { IAuthService } from '../interface';
import { SignUpAction } from './actions/sign-up.action';
import { SignInAction } from './actions/sign-in.action';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly signInAction: SignInAction,
    private readonly signUpAction: SignUpAction,
  ) {}

  signIn(data: SignInDto): Promise<string> {
    return this.signInAction.do(data);
  }
  signUp(): string {
    return this.signUpAction.do();
  }
}
