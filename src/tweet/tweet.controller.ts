import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import Tweet from './tweet.entity';
import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';
import TweetUpdateValidationPipe from './pipes/update-tweet-validation.pipe';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getTweets(
    @Query() getTweetsFilteredDTO: GetTweetsFilteredDTO
  ): Promise<Tweet[]> {
    return this.tweetService.getTweetsFiltered(getTweetsFilteredDTO);
  }

  @Get(':id')
  getTweetById(@Param('id') id: string): Promise<Tweet> {
    return this.tweetService.getTweetById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTweet(@Body() createTweetDTO: CreateTweetDTO): Promise<Tweet> {
    return this.tweetService.createTweet(createTweetDTO);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateTweet(
    @Body(TweetUpdateValidationPipe)
    updateTweetDTO: UpdateTweetDTO
  ): Promise<Tweet> {
    return this.tweetService.updateTweet(updateTweetDTO);
  }

  @Delete(':id')
  deleteTweetById(@Param('id') id: string): Promise<void> {
    return this.tweetService.deleteTweetById(id);
  }
}
