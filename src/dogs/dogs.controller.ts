import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddDogDto } from './dtos/addDog.dto';
import { DogsService } from './dogs.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../decorators/public-decorator';
import { multerStorage, storageDir } from '../utils/storageDir';
import * as path from 'path';
import { MulterDiskUploadedFileInterface } from './interface/MulterDiskUploadedFileInterface';
import { EditDogDto } from './dtos/editDog.dto';


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
      { storage: multerStorage(path.join(storageDir(), 'photos')) },
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
  @Public()
  @Get('/')
  async getAllDogs() {
    return this.dogService.getAllDogs();
  }
  @Delete('/:dogID')
  async deleteDog(@Param('dogID') dogID: string) {
    return await this.dogService.deleteDog(dogID);
  }
  @Public()
  @Get('/photo/:photoID')
  async getDogPhoto(@Param('dogID') dogID: string, @Res() res: any) {
    return this.dogService.getPhoto(dogID, res);
  }
  @Patch('/:dogID')
  async editDog(@Param('dogID') dogID: string, @Body() body: EditDogDto) {
    return await this.dogService.editDog(dogID, body);
  }
}
