import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export default class AuthSignUpCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  nickname: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password to weak. It must have at least 1 upper case letter, 1 lower case letter, 1 number or special character and minimun 6 characters',
  })
  password: string;

  @IsString()
  @Matches(
    /^(19[0-9][0-9]|20[0-9][0-9])[- /.](0[1-9]|1[012])[- /.](0[1-9]|1[0-9]|2[0-9]|3[01])$/
  )
  birthday: string;
}
