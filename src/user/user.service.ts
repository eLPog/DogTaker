import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { createHash } from '../utils/createHash';
import { checkPassword } from '../utils/checkPassword';
import { EditUserDto } from './dtos/editUser.dto';
interface AddUserInterface {
  name: string;
  password: string;
  description: string;
  email: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async addUser(userObj: AddUserInterface): Promise<string | Error> {
    try {
      const password = await createHash(userObj.password);
      const user: UserEntity = {
        ...userObj,
        userID: v4(),
        password,
        numberOfWalks: 0,
        isAdmin: 0,
      };
      await this.userEntityRepository.save(user);
      return user.userID;
    } catch (err) {
      console.log(err);
      if (err.code === `ER_DUP_ENTRY`) {
        return new HttpException(err.message, HttpStatus.CONFLICT);
      } else {
        return new HttpException(
          'Unexpected error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | Error> {
    try {
      const [user] = await this.userEntityRepository.find({
        where: {
          email: email,
        },
      });
      if (!user) {
        return new HttpException('User doesnt exist', HttpStatus.NO_CONTENT);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByID(userID: string): Promise<UserEntity> {
    const [user] = await this.userEntityRepository.find({
      where: {
        userID: userID,
      },
    });
    return user;
  }
  async deleteUser(userID: string, password: string): Promise<void> {
    try {
      const user = await this.getUserByID(userID);
      const isPassValid = await checkPassword(password, user.password);
      if (!isPassValid) return;
      await this.userEntityRepository.delete(user);
    } catch (err) {
      console.log(err);
    }
  }
  async editUser(userObj: EditUserDto, userID: string) {
    try {
      const user = await this.getUserByID(userID);
      const password = userObj.password
        ? await createHash(userObj.password)
        : user.password;

      const newUser = {
        name: userObj.name ?? user.name,
        email: userObj.email ?? user.email,
        password,
        description: userObj.description ?? user.description,
      };
      const editedUser = {
        ...user,
        ...newUser,
      };
      await this.userEntityRepository.save(editedUser);
    } catch (err) {
      console.log(err);
    }
  }
}
