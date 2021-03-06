import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DogsEntity } from './dogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { DogInterface } from './interface/DogInterface';
import { MulterDiskUploadedFileInterface } from './interface/MulterDiskUploadedFileInterface';
import * as fsPromise from 'fs/promises';
import { storageDir } from '../utils/storageDir';
import * as path from 'path';
import { EditDogDto } from './dtos/editDog.dto';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsEntity) private dogRepository: Repository<DogsEntity>,
  ) {}

  filter(dogObj: DogInterface) {
    const { name, breed, bornAt, description, dogID } = dogObj;
    return { name, breed, bornAt, description, dogID };
  }
  async addDog(
    dogObj: Omit<DogInterface, 'dogID'>,
    files: MulterDiskUploadedFileInterface,
  ): Promise<DogInterface | HttpStatus> {
    const myPhoto = files.photo ? files.photo[0] : null;
    try {
      const dog = {
        ...dogObj,
        dogID: v4(),
        photoFn: myPhoto?.filename,
      };
      await this.dogRepository.save(dog);
      return this.filter(dog);
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
      const dog = await this.dogRepository.findOneByOrFail({
        dogID: dogID,
      });
      return this.filter(dog);
    } catch (err) {
      console.log(err);
      return new HttpException(
        `Dog with id ${dogID} not found.`,
        HttpStatus.NO_CONTENT,
      );
    }
  }
  async getAllDogs(): Promise<DogInterface[]> {
    return await this.dogRepository.find();
  }

  async editDog(
    dogID: string,
    dogEditObj: EditDogDto,
  ): Promise<void | HttpStatus> {
    try {
      const dog = await this.getDogById(dogID);
      let editedDog;
      if (!(dog instanceof HttpException)) {
        editedDog = {
          name: dogEditObj.name ?? dog.name,
          breed: dogEditObj.breed ?? dog.breed,
          bornAt: dogEditObj.bornAt ?? dog.bornAt,
          description: dogEditObj.description ?? dog.description,
        };
        const newDog = {
          ...dog,
          ...editedDog,
        };
        await this.dogRepository.save(newDog);
      }
    } catch (err) {
      console.log(err);
      return HttpStatus.INTERNAL_SERVER_ERROR;
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
  async getPhoto(dogID: string, res: any): Promise<void> {
    try {
      const dog = await this.dogRepository.findOneByOrFail({
        dogID: dogID,
      });
      if (!dog) {
        throw new Error('Object not found');
      }
      if (!dog.photoFn) {
        throw new Error('This entity hat no Photo');
      }
      res.sendFile(dog.photoFn, {
        root: path.join(storageDir(), 'photos/'),
      });
    } catch (err) {
      res.json({
        error: err.message,
      });
      console.log(err);
    }
  }
}
