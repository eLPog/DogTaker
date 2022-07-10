import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DogsEntity } from '../dogs/dogs.entity';

@Entity()
export class WalksEntity {
  @PrimaryColumn()
  walkID: string;
  @Column()
  dateOfWalk: string;
  @Column()
  hourOfWalk: number;
  @ManyToOne(() => DogsEntity, (dogs) => dogs.dogID)
  dogs: DogsEntity;
  @ManyToOne(() => UserEntity, (users) => users.userID)
  users: UserEntity;
}
