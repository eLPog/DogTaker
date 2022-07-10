import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../utils/checkPassword';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    try {
      const user: any = await this.userService.getUserByEmail(email);
      if (user && (await checkPassword(pass, user.password))) {
        const { userID, email, role } = user;
        return { userID, email, role };
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
  login(user: any) {
    return { access_token: this.jwtService.sign(user) };
  }
}
