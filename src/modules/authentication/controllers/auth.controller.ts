import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { SignInDto, SignUpDto } from '../dtos';
import { AuthResponse, IAuthController } from '../interfaces';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    status: 200,
    description: '',
  })
  @ApiResponse({
    status: 401,
    description: '',
  })
  @ApiResponse({
    status: 403,
    description: '',
  })
  @ApiResponse({
    status: 404,
    description: '',
  })
  @ApiResponse({
    status: 406,
    description: '',
  })
  @ApiResponse({
    status: 500,
    description: '',
  })
  @Post('sign-in')
  signIn(@Body() data: SignInDto): AuthResponse {
    return this.authService.signIn(data);
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiBody({
    type: SignUpDto,
  })
  @ApiResponse({
    status: 200,
    description: '',
  })
  @ApiResponse({
    status: 401,
    description: '',
  })
  @ApiResponse({
    status: 403,
    description: '',
  })
  @ApiResponse({
    status: 404,
    description: '',
  })
  @ApiResponse({
    status: 406,
    description: '',
  })
  @ApiResponse({
    status: 500,
    description: '',
  })
  @Post('sign-up')
  signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }
}
