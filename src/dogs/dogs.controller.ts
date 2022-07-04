import { Body, Controller, Post } from '@nestjs/common';
import { AddDogDto } from './dtos/addDog.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogService: DogsService) {}
  @Post()
  async addDog(@Body() body: AddDogDto) {
    return await this.dogService.addDog(body);
  }
}
