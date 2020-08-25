import { IsNotEmpty } from 'class-validator';

export default class AuthSignInCredentialsDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
