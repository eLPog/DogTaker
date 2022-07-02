import { Injectable } from '@nestjs/common';
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

  async addUser(userObj): Promise<string> {
    const user = userObj;
    user.userID = v4();
    user.numberOfWalks = 0;
    user.isAdmin = 0;
    await this.userEntityRepository.save(user);
    return user.userID;
  }
}
