import { BaseUserDto } from '@common/dtos/BaseUserDto.dto';

export class CreateUserDto extends BaseUserDto {
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}
