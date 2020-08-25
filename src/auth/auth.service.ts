import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/user/user.repository';
import AuthSignUpCredentialsDTO from './dto/auth-sign-up-credentials.dto';
import AuthSignInCredentialsDTO from './dto/auth-sign-in-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(
    authSignUpCredentialsDTO: AuthSignUpCredentialsDTO
  ): Promise<void> {
    return await this.userRepository.signUp(authSignUpCredentialsDTO);
  }

  async signIn(
    authSignInCredentialsDTO: AuthSignInCredentialsDTO
  ): Promise<{ acessToken: string }> {
    const nickname = await this.userRepository.validateUserPassword(
      authSignInCredentialsDTO
    );

    if (!nickname) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { nickname };
    const acessToken = this.jwtService.sign(payload);

    return { acessToken };
  }
}
