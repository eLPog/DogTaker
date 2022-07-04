import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AddUserDto } from './dtos/addUser.dto';
import { UserService } from './user.service';
import { Public } from '../decorators/public-decorator';
import { DeleteUserDto } from './dtos/deleteUser.dto';
import { UserDataToFrontEnd } from './interface/UserDataToFrontEnd';
import { EditUserDto } from './dtos/editUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Post()
  async addUser(@Body() body: AddUserDto) {
    return await this.userService.addUser(body);
  }

  @Get()
  async getUserData(@Request() req) {
    const user = await this.userService.getUserByID(req.user.userID);
    const userToFront: UserDataToFrontEnd = {
      name: user.name,
      email: user.email,
      description: user.description,
      numberOfWalks: user.numberOfWalks,
    };
    return userToFront;
  }

  @Delete()
  async deleteUser(@Request() req, @Body() body: DeleteUserDto) {
    return await this.userService.deleteUser(req.user.userID, body.password);
  }
  @Patch()
  async editUser(@Body() body: EditUserDto, @Request() req) {
    return await this.userService.editUser(body, req.user.userID);
  }
}
