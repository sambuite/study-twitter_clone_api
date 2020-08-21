import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TweetRepository from './tweet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRepository])],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
