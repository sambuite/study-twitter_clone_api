import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';

import CreateTweetDTO from './dto/create-tweet.dto';
import UpdateTweetDTO from './dto/update-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';

import Tweet from './tweet.entity';
import TweetRepository from './tweet.repository';
import User from 'src/user/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetRepository)
    private tweetRepository: TweetRepository
  ) {}

  async getTweetById(id: string, user: User): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!tweet) {
      throw new NotFoundException(`Tweet with id ${id} was not found`);
    }

    return tweet;
  }

  async createTweet(
    createTweetDTO: CreateTweetDTO,
    user: User
  ): Promise<Tweet> {
    return await this.tweetRepository.createTweet(createTweetDTO, user);
  }

  async deleteTweetById(id: string, user: User): Promise<void> {
    await (await this.getTweetById(id, user)).remove();
  }

  async updateTweet(
    updateTweetDTO: UpdateTweetDTO,
    user: User
  ): Promise<Tweet> {
    const { field, fieldValue, id } = updateTweetDTO;
    const tweetUpdated = await this.getTweetById(id, user);
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
    const tweetsFiltered = await this.tweetRepository.getTweetsFiltered(
      getTweetsFilteredDTO
    );

    return tweetsFiltered;
  }
}
