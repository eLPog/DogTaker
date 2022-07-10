import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DogsEntity } from '../dogs/dogs.entity';

@Entity()
export class WalksEntity {
  @PrimaryColumn()
  walkID: string;
  @Column()
  dateOfWalk: Date;
  @Column()
  hourOfWalk: number;
  @ManyToOne(() => DogsEntity, (dog) => dog.dogID)
  dog: DogsEntity;
  @ManyToOne(() => UserEntity, (users) => users.userID)
  users: UserEntity;
}
