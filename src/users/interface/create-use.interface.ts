export interface CreateUseInterface {
  username: string;
  email: string;
  password: string;
  confirmationPassword: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}
