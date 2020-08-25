import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.passwordSalt);

    return hash === this.password;
  }
}
