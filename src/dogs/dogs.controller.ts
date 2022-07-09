import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AddDogDto } from './dtos/addDog.dto';
import { DogsService } from './dogs.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../decorators/public-decorator';
import { storageDir } from '../utils/storageDir';
import * as path from 'path';
import { MulterDiskUploadedFileInterface } from './interface/MulterDiskUploadedFileInterface';

@Controller('dogs')
export class DogsController {
  constructor(private dogService: DogsService) {}
  @Public()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { dest: path.join(storageDir(), 'photos') },
    ),
  )
  @Post('/')
  async addDog(
    @Body() body: AddDogDto,
    @UploadedFiles() files: MulterDiskUploadedFileInterface,
  ) {
    return await this.dogService.addDog(body, files);
  }
  @Public()
  @Get('/:dogID')
  async getDog(@Param('dogID') dogID: string) {
    return await this.dogService.getDogById(dogID);
  }
  @Delete('/:dogID')
  async deleteDog(@Param('dogID') dogID: string) {
    await this.dogService.deleteDog(dogID);
  }
}
