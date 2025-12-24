import { Injectable } from '@nestjs/common';

import { AuthResponse } from '@modules/authentication/interfaces';

import IAction from '@common/interfaces/IAction';
import { SignInDto } from '@modules/authentication/dtos';
import { LoggerService } from '@infra/logger/logger.service';

@Injectable()
export class SignInAction implements IAction {
  constructor(private readonly logger: LoggerService) {}

  do = (data: SignInDto): AuthResponse => {
    this.logger.error(
      `Sign-in action :: ${JSON.stringify(data)}`,
      'AuthService',
    );
    return {
      refreshToken: 'dummy-refresh',
      accessToken: 'dummy-access',
    };
  };
}
