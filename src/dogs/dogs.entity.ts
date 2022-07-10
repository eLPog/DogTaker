import { Column, Entity, PrimaryColumn } from 'typeorm';

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
