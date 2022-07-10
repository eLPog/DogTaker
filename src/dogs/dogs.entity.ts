import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WalksEntity } from '../walks/walks.entity';

@Entity()
export class DogsEntity {
  @PrimaryColumn()
  dogID: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  breed: string;

  @Column({
    type: 'smallint',
  })
  bornAt: number;

  @Column({
    length: 500,
  })
  description: string;

  @Column({
    default: null,
    nullable: true,
  })
  photoFn: string;


}
