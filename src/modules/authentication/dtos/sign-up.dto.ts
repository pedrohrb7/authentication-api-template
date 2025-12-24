import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  constructor(data: SignUpDto) {
    Object.assign(this, data);
  }

  @IsEmail()
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ example: '******' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'John Doe' })
  fullName: string;
}
