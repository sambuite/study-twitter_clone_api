import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TweetRepository from './tweet.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRepository]), AuthModule],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
