import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DogsEntity } from './dogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
interface AddDogInterface {
  name: string;
  breed: string;
  bornAt: number;
  description: string;
}
@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsEntity) private dogRepository: Repository<DogsEntity>,
  ) {}

  async addDog(dogObj: AddDogInterface) {
    const dog = {
      ...dogObj,
      dogID: v4(),
    };
    await this.dogRepository.save(dog);
    return dog;
  }
}
