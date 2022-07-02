import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn({
    length: 100,
  })
  userID: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    type: 'smallint',
  })
  numberOfWalks: number;

  @Column({
    type: 'tinyint',
  })
  isAdmin: 1 | 2;

  @Column({
    length: 500,
  })
  description: string;
}
