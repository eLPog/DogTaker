import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModule } from './user.module';
import { UserController } from './user.controller';

describe('UserService', () => {
  let service: UserService;
  let userEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneByOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userEntityRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('user repository should be defined', () => {
    expect(userEntityRepository).toBeDefined();
  });
  it('find user by email', async () => {
    const user = await userEntityRepository.findOneBy({
      email: 'test@test.com',
    });
    expect(user.name).toBeDefined();
  });
});
