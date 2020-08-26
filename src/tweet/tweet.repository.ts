import { Repository, EntityRepository, Like } from 'typeorm';
import { v1 as uuid } from 'uuid';
import Tweet from './tweet.entity';
import CreateTweetDTO from './dto/create-tweet.dto';
import GetTweetsFilteredDTO from './dto/get-tweets-filtered.dto';
import User from 'src/user/user.entity';

@EntityRepository(Tweet)
export default class TweetRepository extends Repository<Tweet> {
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
    await tweet.save();
    delete tweet.user;
    delete tweet.id;
    return tweet;
  }

  async getTweetsFiltered(
    getTweetsFilteredDTO: GetTweetsFilteredDTO
  ): Promise<Tweet[]> {
    const { search } = getTweetsFilteredDTO;

    /* 
      ****An Alternative Way
    
    const query = this.createQueryBuilder('tweet');

    if (search) {
      query.andWhere('tweet.text LIKE :search', { search: `%${search}%` });
    }

    const tweetsFiltered = await query.getMany();
    
    */

    let tweetsFiltered: Tweet[];

    if (search) {
      tweetsFiltered = await this.find({
        where: { text: Like(`%${search}%`) },
      });
    } else {
      tweetsFiltered = await this.find();
    }

    return tweetsFiltered;
  }
}
