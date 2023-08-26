import { Injectable } from '@nestjs/common';
import { UserModel } from '@src/users/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';

@Injectable()
export class UsersService {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  createUser(newUser: RegistrationUserDto) {
    return this.userModel.create(newUser);
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findOneName(username: string) {
    return this.userModel.findOne({
      where: { username },
    });
  }

  async findOneEmail(userEmail: string) {
    console.log(userEmail);
    return await this.userModel.findOne({
      where: { email: userEmail },
    });
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
