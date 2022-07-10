import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalksEntity } from './walks.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AddWalkDto } from './dtos/addWalk.dto';

@Injectable()
export class WalksService {
  // constructor(
  //   @InjectRepository(WalksEntity)
  //   private walksEntityRepository: Repository<WalksEntity>,
  // ) {}

  async addWalk(dogID: string, userID: string, body: AddWalkDto) {
    const newWalk = {
      walkID: v4(),
      dateOfWalk: body.dateOfWalk,
      hourOfWalk: body.hourOfWalk,
      dogsDogID: dogID,
      usersUserID: userID,
    };
  }
}
