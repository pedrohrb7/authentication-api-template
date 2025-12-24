import { SignInDto, SignUpDto } from '../dtos';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthController {
  signIn(data: SignInDto): AuthResponse;
  signUp(data: SignUpDto): void;
}

export interface IAuthService {
  signIn(data: SignInDto): AuthResponse;
  signUp(data: SignUpDto): void;
}
