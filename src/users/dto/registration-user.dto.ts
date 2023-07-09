import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUseDtoInterface } from '@src/users/interface/create-use-dto.Interface';

export class RegistrationUserDto implements CreateUseDtoInterface {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly role?: string;

  @ApiProperty({ type: String })
  readonly created_at?: Date;

  @ApiProperty({ type: String })
  readonly updated_at?: Date;
}
