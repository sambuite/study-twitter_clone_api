import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import AuthSignUpCredentialsDTO from './dto/auth-sign-up-credentials.dto';
import AuthSignInCredentialsDTO from './dto/auth-sign-in-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) authSignUpCredentialsDTO: AuthSignUpCredentialsDTO
  ): Promise<void> {
    return this.authService.signUp(authSignUpCredentialsDTO);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) authSignInCredentialsDTO: AuthSignInCredentialsDTO
  ): Promise<{ acessToken: string }> {
    return this.authService.signIn(authSignInCredentialsDTO);
  }
}
