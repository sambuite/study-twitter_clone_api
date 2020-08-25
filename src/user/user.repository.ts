import { Repository, EntityRepository } from 'typeorm';
import { v1 as uuid } from 'uuid';

import AuthSignUpCredentialsDTO from '../auth/dto/auth-sign-up-credentials.dto';

import User from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async signUp(authSignUpCredentials: AuthSignUpCredentialsDTO): Promise<void> {
    const { nickname, password, birthday } = authSignUpCredentials;

    const user = new User();
    user.id = uuid();
    user.birthday = birthday;
    user.nickname = nickname;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code == 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Nickname already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
