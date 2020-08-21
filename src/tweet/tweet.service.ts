import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = this.tweets.find(tweet => tweet.id === id);

    if (!found) {
      throw new NotFoundException(`Tweet with id ${id} was not found`);
    }

    return found;
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
    const tweetToBeUpdated = this.getTweetById(id);
    tweetToBeUpdated[field] = fieldValue;
    return tweetToBeUpdated;
  }

  deleteTweetById(id: string): void {
    const tweetToBeDeleted = this.getTweetById(id);
    this.tweets = this.tweets.filter(tweet => tweet !== tweetToBeDeleted);
  }
}
