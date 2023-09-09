export class RegisterUserDto {
  username: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  role = 'user';
}
