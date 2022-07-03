import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public-decorator';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  // IMPORTANT! Login data must have keys:
  // username - this should be user email, and password with user password
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (err) {
      console.log(err);
    }
  }
}
