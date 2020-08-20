import { Controller, Get } from '@nestjs/common';
import { TweetService } from './tweet.service';
import Tweet from './tweet.model';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.tweetService.getAllTweets();
  }
}
