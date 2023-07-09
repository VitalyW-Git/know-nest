import {
  AllowNull,
  Column,
  CreatedAt,
  Default,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DATE, ENUM, INTEGER, STRING } from 'sequelize';
import { IsEmail, MinLength } from 'class-validator';
import { UserRoleEnum } from '@src/users/enum/user-role.enum';

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

  @AllowNull(false)
  @Column({ type: STRING })
  public name: string;

  @AllowNull(false)
  @IsEmail()
  @Column({
    type: STRING(100),
    unique: true,
  })
  public email: string;

  @AllowNull(false)
  @MinLength(6)
  @Column({
    type: STRING(100),
    unique: true,
  })
  public password: string;

  @AllowNull(false)
  @Default(UserRoleEnum.USER)
  @Column({ type: ENUM(...Object.values(UserRoleEnum)) })
  public role: string;

  @UpdatedAt
  @AllowNull(true)
  @Column({ type: DATE })
  public created_at: Date;

  @CreatedAt
  @AllowNull(true)
  @Column({ type: DATE })
  public updated_at: Date;
}
