import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IAuthController } from '../interface';
import { SignInDto } from '../dtos/SignInDto.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController implements IAuthController {
  constructor() {}

  @ApiOperation({ summary: 'Sign in a user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.FORBIDDEN)
  @Post('signin')
  signIn(@Body() body: SignInDto): string {
    throw new ForbiddenException(
      `Method not implemented.${JSON.stringify(body)}`,
    );
  }

  @ApiOperation({ summary: 'Sign up a new user' })
  @Post('signup')
  signUp(): string {
    throw new Error('Method not implemented.');
  }
}
