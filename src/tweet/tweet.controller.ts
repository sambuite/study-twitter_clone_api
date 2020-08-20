import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import Tweet from './tweet.model';
import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.tweetService.getAllTweets();
  }

  @Get(':id')
  getTweetById(@Param('id') id: string): Tweet {
    return this.tweetService.getTweetById(id);
  }

  @Post()
  createTweet(@Body() createTweetDTO: CreateTweetDTO): Tweet {
    return this.tweetService.createTweet(createTweetDTO);
  }

  @Patch()
  updateTweet(
    @Body()
    updateTweetDTO: UpdateTweetDTO
  ) {
    this.tweetService.updateTweet(updateTweetDTO);
  }

  @Delete(':id')
  deleteTweetById(@Param('id') id: string): void {
    this.tweetService.deleteTweetById(id);
  }
}
