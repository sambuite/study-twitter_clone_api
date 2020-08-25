import { IsNotEmpty } from 'class-validator';

export default class AuthSignInCredentialsDTO {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;
}
