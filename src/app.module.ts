import { Module } from '@nestjs/common';
import { TweetModule } from './tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmCongig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typrOrmCongig), TweetModule],
})
export class AppModule {}
