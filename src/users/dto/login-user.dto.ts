import { LoginUserInterface } from '@src/users/interface/login-user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto extends LoginUserInterface {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
