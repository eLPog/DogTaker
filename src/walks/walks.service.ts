import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalksEntity } from './walks.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AddWalkDto } from './dtos/addWalk.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class WalksService {
  constructor(
    @InjectRepository(WalksEntity)
    private walksEntityRepository: Repository<WalksEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async addWalk(dogID: string, userID: string, body: AddWalkDto) {
    const newWalk = {
      walkID: v4(),
      dateOfWalk: body.dateOfWalk,
      hourOfWalk: body.hourOfWalk,
      dogsDogID: dogID,
      usersUserID: userID,
    };
    await this.walksEntityRepository.save(newWalk);
  }
  async findWalk(walkID: string) {
    return await this.walksEntityRepository.findOneByOrFail({
      walkID: walkID,
    });
  }
  async getAllWalks() {
    return await this.walksEntityRepository.find({
      order: {
        dateOfWalk: 'ASC',
      },
    });
  }

  async checkAccess(walkID: string, userID: string) {
    const walk = await this.findWalk(walkID);
    const user = await this.userEntityRepository.findOneByOrFail({
      userID: userID,
    });
    return walk.usersUserID === user.userID;
  }

  async cancelWalk(walkID: string, userID: string) {
    const userHasAccess = await this.checkAccess(walkID, userID);
    if (!userHasAccess) {
      return HttpStatus.FORBIDDEN;
    }
    const walk = await this.findWalk(walkID);
    await this.walksEntityRepository.delete(walk);
  }

  async getAllUserWalks(userID: string) {
    return await this.walksEntityRepository.find({
      where: {
        usersUserID: userID,
      },
      order: {
        dateOfWalk: 'ASC',
      },
    });
  }

  async getDogWalks(dogID: string) {
    return await this.walksEntityRepository.find({
      where: {
        dogsDogID: dogID,
      },
      order: {
        dateOfWalk: 'ASC',
      },
    });
  }
}
