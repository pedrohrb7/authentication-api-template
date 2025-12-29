import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignInDto } from '@modules/authentication/dtos/SignInDto.dto';

import { LoggerService } from '@infra/logger/services/logger.service';
import { UserService } from '@modules/user/services/user.service';

import IAction from '@common/interfaces/IAction';

@Injectable()
export class SignInAction implements IAction {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  do = async (data: SignInDto): Promise<string> => {
    this.logger.log(
      `User signed in with email: ${JSON.stringify(data)}`,
      'SignInAction',
    );

    const user = await this.userService.findByEmail(data.username);
    if (!user.length) {
      throw new NotFoundException('User not found');
    }

    if (data.password !== user[0].password) {
      throw new UnauthorizedException('Email/Password wirng!');
    }

    this.logger.debug(`Found user: ${JSON.stringify(user)}`, 'SignInAction');

    return 'sign-in-success';
  };
}
