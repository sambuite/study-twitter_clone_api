import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  birthday: Date;
}
