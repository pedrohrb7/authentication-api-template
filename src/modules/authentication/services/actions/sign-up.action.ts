import { Injectable } from '@nestjs/common';

import { LoggerService } from '@infra/logger/services/logger.service';

import IAction from '@common/interfaces/IAction';

@Injectable()
export class SignUpAction implements IAction {
  constructor(private readonly logger: LoggerService) {}

  do(): string {
    this.logger.log('New user signed up', 'SignUpAction');
    return 'sign-up-success';
  }
}
