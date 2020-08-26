import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Tweet from 'src/tweet/tweet.entity';
import { type } from 'os';

@Entity()
@Unique(['nickname'])
export default class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column()
  birthday: string;

  @OneToMany(
    type => Tweet,
    tweet => tweet.user,
    { eager: true }
  )
  tweets: Tweet[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.passwordSalt);

    return hash === this.password;
  }
}
