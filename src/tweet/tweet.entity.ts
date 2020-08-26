import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import User from 'src/user/user.entity';

@Entity()
export default class Tweet extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  media_url: string;

  @ManyToOne(
    type => User,
    user => user.tweets,
    { eager: false }
  )
  user: User;
}
