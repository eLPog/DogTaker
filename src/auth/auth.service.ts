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
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
  login(user: any) {
    const payload = {
      username: user.name,
      sub: user.userID,
      email: user.email,
      numberOfWalks: user.numberOfWalks,
      description: user.description,
      role: user.role,
      registerAt: user.registerAt,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
