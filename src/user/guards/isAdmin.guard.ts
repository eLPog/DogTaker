import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class isAdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const userData = await this.userService.getUserByEmail(user.email);
    if (userData.role !== 'admin') {
      return false;
    }
    return true;
  }
}
