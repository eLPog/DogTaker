import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalksEntity } from './walks.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AddWalkDto } from './dtos/addWalk.dto';

@Injectable()
export class WalksService {
  constructor(
    @InjectRepository(WalksEntity)
    private walksEntityRepository: Repository<WalksEntity>,
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
    return await this.walksEntityRepository.find();
  }

  async cancelWalk(walkID: string) {
    const walk = await this.findWalk(walkID);
    await this.walksEntityRepository.delete(walk);
  }
}
