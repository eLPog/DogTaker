import { Module } from '@nestjs/common';
import { WalksController } from './walks.controller';
import { WalksService } from './walks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalksEntity } from './walks.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [WalksController],
  providers: [WalksService],
  imports: [
    TypeOrmModule.forFeature([WalksEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
})
export class WalksModule {}
