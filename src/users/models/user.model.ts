import { AllowNull, Column, Model, Table } from 'sequelize-typescript';
import { DATE, INTEGER, STRING } from 'sequelize';
import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
  collate: 'utf8_general_ci',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserModel extends Model<UserModel> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;

  @ApiProperty({ type: String, example: 'Name' })
  @AllowNull(false)
  @Column({ type: STRING })
  public name: string;

  @ApiProperty({ type: String, example: 'Email' })
  @AllowNull(false)
  @IsEmail()
  @Column({
    type: STRING(100),
    unique: true,
  })
  public email: string;

  @ApiProperty({ type: String, example: 'Email' })
  @MinLength(6)
  @AllowNull(false)
  @Column({
    type: STRING(100),
    unique: true,
  })
  public password: string;

  @ApiProperty({ type: String, example: 'RefreshToken' })
  @AllowNull(false)
  @Column({
    type: STRING,
    unique: true,
  })
  public refresh_token: string;

  @AllowNull(false)
  @Column({ type: DATE })
  public created_at: Date;

  @AllowNull(false)
  @Column({ type: DATE })
  public updated_at: Date;
}
