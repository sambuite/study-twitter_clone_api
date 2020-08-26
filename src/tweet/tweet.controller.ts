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
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import Tweet from './tweet.entity';
import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';
import TweetUpdateValidationPipe from './pipes/update-tweet-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import User from 'src/user/user.entity';

@Controller('tweet')
@UseGuards(AuthGuard())
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getTweets(
    @Query() getTweetsFilteredDTO: GetTweetsFilteredDTO
  ): Promise<Tweet[]> {
    return this.tweetService.getTweetsFiltered(getTweetsFilteredDTO);
  }

  @Get(':id')
  getTweetById(@Param('id') id: string, @GetUser() user: User): Promise<Tweet> {
    return this.tweetService.getTweetById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTweet(
    @Body() createTweetDTO: CreateTweetDTO,
    @GetUser() user: User
  ): Promise<Tweet> {
    return this.tweetService.createTweet(createTweetDTO, user);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateTweet(
    @Body(TweetUpdateValidationPipe)
    updateTweetDTO: UpdateTweetDTO,
    @GetUser() user: User
  ): Promise<Tweet> {
    return this.tweetService.updateTweet(updateTweetDTO, user);
  }

  @Delete(':id')
  deleteTweetById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.tweetService.deleteTweetById(id, user);
  }
}
