import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  constructor(data: SignInDto) {
    Object.assign(this, data);
  }

  @IsEmail()
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '******' })
  password: string;
}
