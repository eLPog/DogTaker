import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DogsEntity } from './dogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { DogInterface } from './interface/DogInterface';
import { MulterDiskUploadedFileInterface } from './interface/MulterDiskUploadedFileInterface';
import * as fsPromise from 'fs/promises';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsEntity) private dogRepository: Repository<DogsEntity>,
  ) {}

  async addDog(
    dogObj: Omit<DogInterface, 'dogID'>,
    files: MulterDiskUploadedFileInterface,
  ): Promise<DogInterface | HttpStatus> {
    const myPhoto = files.photo ? files.photo[0] : null;
    try {
      const dog = {
        ...dogObj,
        dogID: v4(),
        photoFn: myPhoto.filename,
      };
      await this.dogRepository.save(dog);
      return dog;
    } catch (err) {
      try {
        if (myPhoto) {
          await fsPromise.unlink(myPhoto.path);
        }
      } catch (err2) {
        console.log(err2);
      }
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
