import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddDogDto } from './dtos/addDog.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogService: DogsService) {}
  @Post()
  async addDog(@Body() body: AddDogDto) {
    return await this.dogService.addDog(body);
  }
  @Get('/:dogID')
  async getDog(@Param('dogID') dogID: string) {
    return await this.dogService.getDogById(dogID);
  }
  @Delete('/:dogID')
  async deleteDog(@Param('dogID') dogID: string) {
    await this.dogService.deleteDog(dogID);
  }
}
