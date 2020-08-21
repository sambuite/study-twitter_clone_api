import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export default class Tweet extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  media_url: string;
}
