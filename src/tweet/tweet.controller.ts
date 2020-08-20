import { Controller, Get, Post, Body } from '@nestjs/common';
import { TweetService } from './tweet.service';
import Tweet from './tweet.model';
import CreateTweetDTO from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.tweetService.getAllTweets();
  }

  @Post()
  createTweet(@Body() createTweetDTO: CreateTweetDTO): Tweet {
    return this.tweetService.createTweet(createTweetDTO);
  }
}
