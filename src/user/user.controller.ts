import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { AddUserDto } from './dtos/addUser.dto';
import { UserService } from './user.service';
import { Public } from '../decorators/public-decorator';
import { DeleteUserDto } from './dtos/deleteUser.dto';

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
    return await this.userService.getUserByEmail(req.user.email);
  }

  @Delete()
  async deleteUser(@Request() req, @Body() body: DeleteUserDto) {
    return await this.userService.deleteUser(req.user.userID, body.password);
  }
}
