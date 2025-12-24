import { BaseUserDto } from '@common/dtos/BaseUserDto.dto';

export class UpdateUserDto extends BaseUserDto {
  updatedAt: number;
}
