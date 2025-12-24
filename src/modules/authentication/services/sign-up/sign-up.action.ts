import IAction from '@common/interfaces/IAction';
import { LoggerService } from '@infra/logger/logger.service';
import { SignUpDto } from '@modules/authentication/dtos';

export class SignUpAction implements IAction {
  constructor(private readonly logger: LoggerService) {}

  do = (data: SignUpDto): void => {
    this.logger.log(`Sign-up action :: ${JSON.stringify(data)}`, 'AuthService');
  };
}
