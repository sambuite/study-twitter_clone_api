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
import Tweet from './tweet.model';
import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getTweets(@Query() getTweetsFilteredDTO: GetTweetsFilteredDTO): Tweet[] {
    return this.tweetService.getTweetsFiltered(getTweetsFilteredDTO);
  }

  @Get(':id')
  getTweetById(@Param('id') id: string): Tweet {
    return this.tweetService.getTweetById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
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
