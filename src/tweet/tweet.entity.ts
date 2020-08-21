import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  media_url: string;
}
