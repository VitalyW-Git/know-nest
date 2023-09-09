import { CreateUseInterface } from '@src/users/interface/create-use.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto implements CreateUseInterface {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly username: string;

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
  @MinLength(6)
  readonly confirmationPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly role?: string;

  @ApiProperty({ type: String })
  readonly created_at?: Date;

  @ApiProperty({ type: String })
  readonly updated_at?: Date;
}
