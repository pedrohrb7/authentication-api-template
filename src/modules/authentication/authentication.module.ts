import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SignUpAction } from './services/actions/sign-up.action';
import { SignInAction } from './services/actions/sign-in.action';

import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, SignUpAction, SignInAction],
  exports: [AuthService],
})
export class AuthenticationModule {}
