import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async addUser(userObj): Promise<string | Error> {
    try {
      const user = {
        ...userObj,
        userID: v4(),
        numberOfWalks: 0,
        isAdmin: 0,
      };
      await this.userEntityRepository.save(user);
      return user.userID;
    } catch (err) {
      console.log(err);
      return new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async getUserByEmail(email: string) {
    return this.userEntityRepository.find({
      where: {
        email: email,
      },
    });
  }
}
