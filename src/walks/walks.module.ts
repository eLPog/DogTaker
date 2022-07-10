import { Module } from '@nestjs/common';
import { WalksController } from './walks.controller';
import { WalksService } from './walks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalksEntity } from './walks.entity';

@Module({
  controllers: [WalksController],
  providers: [WalksService],
  imports: [TypeOrmModule.forFeature([WalksEntity])],
})
export class WalksModule {}
