import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { UserEntity } from '@infra/database/mongodb/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserService } from '../interfaces';

import { LoggerService } from '@infra/logger/services/logger.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
    private readonly logger: LoggerService,
  ) {}

  async findAll(params: any): Promise<UserEntity[]> {
    this.logger.log(
      `Finding all users with params: ${JSON.stringify(params)}`,
      'UserService :: find-all',
    );
    try {
      return this.userRepository.find();
    } catch (error) {
      this.logger.error(
        `Error finding users: ${JSON.stringify(error)}`,
        'UserService :: find-all',
      );
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    return await this.userRepository.findOneBy({ _id: id });
  }

  update(userData: any): Promise<any> {
    this.logger.log(
      `Updating user with data: ${JSON.stringify(userData)}`,
      'UserService :: update-user',
    );
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    this.logger.log(
      `Deleting user with id: ${id}`,
      'UserService :: delete-user',
    );
    throw new Error('Method not implemented.');
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    const user = await this.userRepository.find({ where: { email } });
    return user;
  }
}
