import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DogsEntity } from './dogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { DogInterface } from './interface/DogInterface';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsEntity) private dogRepository: Repository<DogsEntity>,
  ) {}

  async addDog(
    dogObj: Omit<DogInterface, 'dogID'>,
  ): Promise<DogInterface | HttpStatus> {
    try {
      const dog = {
        ...dogObj,
        dogID: v4(),
      };
      await this.dogRepository.save(dog);
      return dog;
    } catch (err) {
      console.log(err);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  async getDogById(dogID: string): Promise<DogInterface | HttpException> {
    try {
      return await this.dogRepository.findOneByOrFail({
        dogID: dogID,
      });
    } catch (err) {
      console.log(err);
      return new HttpException(
        `Dog with id ${dogID} not found.`,
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async deleteDog(dogID: string): Promise<void | HttpStatus> {
    try {
      await this.dogRepository.delete({
        dogID: dogID,
      });
    } catch (err) {
      console.log(err);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
