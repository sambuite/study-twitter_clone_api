import { EntityRepository, Repository } from 'typeorm';
import User from '@entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByNickname(nickname: string): Promise<User> {
    const userData = await this.findOne({
      where: { nickname },
    });

    return userData;
  }
}
