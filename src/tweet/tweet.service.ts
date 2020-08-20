import { Injectable } from '@nestjs/common';
import Tweet from './tweet.model';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];

  getAllTweets() {
    return this.tweets;
  }
}
