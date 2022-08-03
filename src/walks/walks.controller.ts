import {
  Controller,
  Param,
  Post,
  Request,
  Body,
  Delete,
  Get,
  UseGuards,
  Query,
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
  @Get('/:walkID')
  async getWalk(@Param('walkID') walkID: string) {
    return await this.walksService.getWalk(walkID);
  }

  @Delete('/:walkID')
  async deleteWalk(@Param('walkID') walkID: string, @Request() req) {
    return this.walksService.cancelWalk(walkID, req.user.sub);
  }

  @Get('/')
  @UseGuards(isAdminGuard)
  async getAllWalks() {
    return await this.walksService.getAllWalks();
  }
  @Get('/myWalks')
  async getUserWalks(@Request() req) {
    return await this.walksService.getAllUserWalks(req.user.sub);
  }
  @Get('/:dogID')
  async getDogWalks(@Param('dogID') dogID: string) {
    return await this.walksService.getDogWalks(dogID);
  }
}

