import { SignInDto } from '../dtos/SignInDto.dto';

export interface IAuthController {
  signIn(body: SignInDto): Promise<string>;
  signUp(): string;
}

export interface IAuthService {
  signIn(data: SignInDto): Promise<string>;
  signUp(): string;
}
