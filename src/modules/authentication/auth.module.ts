import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SignInAction } from './services/sign-in/sign-in.action';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, SignInAction],
  exports: [AuthService],
})
export class AuthModule {}
