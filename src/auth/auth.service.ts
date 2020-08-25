import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/user/user.repository';
import AuthSignUpCredentialsDTO from './dto/auth-sign-up-credentials.dto';
import AuthSignInCredentialsDTO from './dto/auth-sign-in-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(
    authSignUpCredentialsDTO: AuthSignUpCredentialsDTO
  ): Promise<void> {
    return await this.userRepository.signUp(authSignUpCredentialsDTO);
  }

  async signIn(authSignInCredentialsDTO: AuthSignInCredentialsDTO) {
    const user = await this.userRepository.validateUserPassword(
      authSignInCredentialsDTO
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
