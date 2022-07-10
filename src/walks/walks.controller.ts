import {
  Controller,
  Param,
  Post,
  Request,
  Body,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AddWalkDto } from './dtos/addWalk.dto';
import { WalksService } from './walks.service';
import { isAdminGuard } from '../user/guards/isAdmin.guard';

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

  @Delete('/:walkID')
  async deleteWalk(@Param('walkID') walkID: string) {
    return this.walksService.cancelWalk(walkID);
  }

  @Get('/')
  @UseGuards(isAdminGuard)
  async getAllWalks() {
    return await this.walksService.getAllWalks();
  }
}
