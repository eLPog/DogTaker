import { Controller, Param, Post, Request, Body } from '@nestjs/common';
import { AddWalkDto } from './dtos/addWalk.dto';

@Controller('walks')
export class WalksController {
  @Post('/:dogID')
  async addWalk(
    @Param('dogID') dogID: string,
    @Request() req,
    @Body() body: AddWalkDto,
  ) {
    //logika
  }
}
