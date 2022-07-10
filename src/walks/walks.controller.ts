import { Controller, Param, Post, Request, Body } from '@nestjs/common';
import { AddWalkDto } from './dtos/addWalk.dto';
import { WalksService } from './walks.service';

@Controller('walks')
export class WalksController {
  constructor(private walksService: WalksService) {}
  @Post('/:dogID')
  async addWalk(
    @Param('dogID') dogID: string,
    @Request() req,
    @Body() body: AddWalkDto,
  ) {
    return await this.walksService.addWalk(dogID, req.user.sub, body);
  }
}
