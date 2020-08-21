import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import Tweet from './tweet.model';

import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];

  getAllTweets(): Tweet[] {
    return this.tweets;
  }

  getTweetsFiltered(getTweetsFilteredDTO: GetTweetsFilteredDTO): Tweet[] {
    const { search } = getTweetsFilteredDTO;

    let tweetsFiltered = this.getAllTweets();

    if (search) {
      tweetsFiltered = tweetsFiltered.filter(tweet =>
        tweet.text.includes(search)
      );
    }

    return tweetsFiltered;
  }

  getTweetById(id: string): Tweet {
    return this.tweets.find(tweet => tweet.id === id);
  }

  createTweet(createTweetDTO: CreateTweetDTO): Tweet {
    const { text, media_url } = createTweetDTO;

    const tweet: Tweet = {
      id: uuid(),
      text,
      media_url,
    };

    this.tweets.push(tweet);
    return tweet;
  }

  updateTweet(updateTweetDTO: UpdateTweetDTO): Tweet {
    const { id, field, fieldValue } = updateTweetDTO;
    console.log({ id, field, fieldValue });
    const tweet = this.getTweetById(id);
    tweet[field] = fieldValue;
    return tweet;
  }

  deleteTweetById(id: string): void {
    this.tweets = this.tweets.filter(tweet => tweet.id !== id);
  }
}
