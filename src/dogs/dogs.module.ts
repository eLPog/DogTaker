import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsEntity } from './dogs.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DogsEntity]), UserModule],
  providers: [DogsService],
  controllers: [DogsController],
})
export class DogsModule {}
