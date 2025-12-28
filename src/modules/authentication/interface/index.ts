import { SignInDto } from '../dtos/SignInDto.dto';

export interface IAuthController {
  signIn(body: SignInDto): string;
  signUp(): string;
}
