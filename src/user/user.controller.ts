import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AddUserDto } from './dtos/addUser.dto';
import { UserService } from './user.service';
import { Public } from '../decorators/public-decorator';

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
    const user = await this.userService.getUserByEmail(req.user.email);
    return user;
  }
}
