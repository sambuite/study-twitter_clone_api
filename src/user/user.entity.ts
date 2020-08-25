import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from 'typeorm';

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
}
