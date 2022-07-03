import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserDto } from './dtos/addUser.dto';
import { UserService } from './user.service';
import { Public } from '../decorators/public-decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async addUser(@Body() body: AddUserDto) {
    return await this.userService.addUser(body);
  }
  @Public()
  @Get()
  async getTest() {
    return 'działa';
  }
}
