import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserDto } from './dtos/addUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async addUser(@Body() body: AddUserDto) {
    return await this.userService.addUser(body);
  }
}
