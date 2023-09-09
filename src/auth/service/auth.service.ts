import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { LoginUserDto, RegisterUserDto } from '@src/auth/models';
import { User } from '@src/auth/models/user.interface';

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      username: 'Joe',
      lastName: 'Foo',
      email: 'joefoo@test.com',
      // Passw0rd!
      password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
      role: 'admin',
    },
    {
      id: 2,
      username: 'Jen',
      lastName: 'Bar',
      email: 'jenbar@test.com',
      // P4ssword!
      password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
      role: 'user',
    },
  ];

  /*{
  "id": 3,
  "firstName": "vit",
  "lastName": "pit",
  "email": "vir@mail.ru"
}*/

  /* This method validates a users credentials and returns the user object */
  async validateUser(user: LoginUserDto) {
    const foundUser = this.users.find((u) => u.email === user.email);
    if (!user || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password: _password, ...retUser } = foundUser;
    console.log('validateUser', retUser);
    return retUser;
  }
  /* Ideally you would want to store your users in a database.
  We also return the user object but without the password or confirmationPassword */
  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    console.log('registerUser', user);
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User email must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }
    const { confirmationPassword: _, ...newUser } = user;
    this.users.push({
      ...newUser,
      password: await hash(user.password, 12),
      id: this.users.length + 1,
    });

    return {
      id: this.users.length,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  findById(id: number): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find((u) => u.id === id);
    console.log('findById', user);
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }
}
