import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from './interface/RolesEnum';

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

  @Column()
  role: Role.USER | Role.ADMIN;

  @Column({
    length: 500,
  })
  description: string;

  @Column()
  registerAt: string;
}
