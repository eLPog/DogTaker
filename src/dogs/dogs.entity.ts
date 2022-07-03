import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DogsEntity {
  @PrimaryColumn()
  dogID: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  bornAt: number;

  @Column()
  description: string;
}
