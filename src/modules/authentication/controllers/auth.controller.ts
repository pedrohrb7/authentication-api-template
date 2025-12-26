import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IAuthController } from '../interface';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController implements IAuthController {
  @Post('signin')
  signIn(): string {
    throw new Error('Method not implemented.');
  }

  @Post('signup')
  signUp(): string {
    throw new Error('Method not implemented.');
  }
}
