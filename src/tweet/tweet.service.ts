import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import Tweet from './tweet.model';

import CreateTweetDTO from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];

  getAllTweets() {
    return this.tweets;
  }

  createTweet(createTweetDTO: CreateTweetDTO) {
    const { text, media_url } = createTweetDTO;

    const tweet: Tweet = {
      id: uuid(),
      text,
      media_url,
    };

    this.tweets.push(tweet);
    return tweet;
  }
}
