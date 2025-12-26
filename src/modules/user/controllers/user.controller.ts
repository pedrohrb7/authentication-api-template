import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoggerService } from '@infra/logger/services/logger.service';
import { UserService } from '../services/user.service';

import { IUserController } from '../interfaces';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController implements IUserController {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Find all users' })
  @Get()
  async findAll(@Query() params: any): Promise<any[]> {
    this.logger.log(
      `Finding all users with params: ${JSON.stringify(params)}`,
      'UserController :: find-all',
    );
    return await this.userService.findAll(params);
  }

  @ApiOperation({ summary: 'Find a user by id' })
  @Get(':id')
  findById(@Param('id') id: string): Promise<any> {
    this.logger.log(
      `Finding user by id: ${id}`,
      'UserController :: find-by-id',
    );
    throw new Error('Method not implemented.');
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  create(@Body() userData: CreateUserDto): Promise<any> {
    try {
      return this.userService.create(userData);
    } catch (error) {
      this.logger.error(
        `Error creating user: ${JSON.stringify(error)}`,
        'UserController :: create-user',
      );
      throw new Error('Method not implemented.');
    }
  }

  @ApiOperation({ summary: 'Update user' })
  @Patch()
  update(userData: any): Promise<any> {
    this.logger.log(
      `Updating user with data: ${JSON.stringify(userData)}`,
      'UserController :: update-user',
    );
    throw new Error('Method not implemented.');
  }

  @ApiOperation({ summary: '(soft) Delete a user' })
  @Delete(':id')
  delete(id: string): Promise<void> {
    this.logger.log(
      `Deleting user with id: ${id}`,
      'UserController :: delete-user',
    );
    throw new Error('Method not implemented.');
  }
}
