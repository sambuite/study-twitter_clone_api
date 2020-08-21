import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';

import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';

import Tweet from './tweet.entity';
import TweetRepository from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetRepository)
    private tweetRepository: TweetRepository
  ) {}

  async getTweetById(id: string): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne(id);

    if (!tweet) {
      throw new NotFoundException(`Tweet with id ${id} was not found`);
    }

    return tweet;
  }

  async createTweet(createTweetDTO: CreateTweetDTO): Promise<Tweet> {
    return this.tweetRepository.createTweet(createTweetDTO);
  }

  async deleteTweetById(id: string): Promise<void> {
    await (await this.getTweetById(id)).remove();
  }

  async updateTweet(updateTweetDTO: UpdateTweetDTO): Promise<Tweet> {
    const { field, fieldValue, id } = updateTweetDTO;
    const tweetUpdated = await this.getTweetById(id);
    tweetUpdated[field] = fieldValue;
    await tweetUpdated.save();

    return tweetUpdated;
  }

  async getAllTweets(): Promise<Tweet[]> {
    return await this.tweetRepository.find();
  }

  async getTweetsFiltered(
    getTweetsFilteredDTO: GetTweetsFilteredDTO
  ): Promise<Tweet[]> {
    const tweetsFiltered = this.tweetRepository.getTweetsFiltered(
      getTweetsFilteredDTO
    );

    return tweetsFiltered;
  }
}
