import { Repository, EntityRepository, Like } from 'typeorm';
import { v1 as uuid } from 'uuid';
import Tweet from './tweet.entity';
import CreateTweetDTO from './dto/create-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';
import User from 'src/user/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Tweet)
export default class TweetRepository extends Repository<Tweet> {
  private logger = new Logger();

  async createTweet(
    createTweetDTO: CreateTweetDTO,
    user: User
  ): Promise<Tweet> {
    const { media_url, text } = createTweetDTO;

    const tweet = new Tweet();
    tweet.id = uuid();
    tweet.media_url = media_url;
    tweet.text = text;
    tweet.user = user;

    try {
      await tweet.save();
      delete tweet.user;
      delete tweet.id;
      return tweet;
    } catch (error) {
      this.logger.error(
        `Failed to create a tweet for user ${
          user.nickname
        }, Data: ${JSON.stringify(createTweetDTO)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async getTweetsFiltered(
    getTweetsFilteredDTO: GetTweetsFilteredDTO
  ): Promise<Tweet[]> {
    const { search } = getTweetsFilteredDTO;

    const query = this.createQueryBuilder('tweet');

    if (search) {
      query.andWhere('tweet.text LIKE :search', { search: `%${search}%` });
    }

    try {
      const tweetsFiltered = await query.getMany();

      return tweetsFiltered;
    } catch (error) {
      this.logger.error(
        `Failed to get the tweet. Filter ${JSON.stringify(
          getTweetsFilteredDTO
        )}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }
}
