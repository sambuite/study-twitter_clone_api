import { Module } from '@nestjs/common';
import { TweetModule } from './tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmCongig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typrOrmCongig), TweetModule, AuthModule, UserModule],
})
export class AppModule {}
