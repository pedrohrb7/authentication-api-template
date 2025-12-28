import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

import { IAuthController } from '../interface';
import { SignInDto } from '../dtos/SignInDto.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in a user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<string> {
    return await this.authService.signIn(body);
  }

  @ApiOperation({ summary: 'Sign up a new user' })
  @Post('signup')
  signUp(): string {
    return this.authService.signUp();
  }
}
