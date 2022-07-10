import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
describe('UserService', () => {
  let service: UserService;
  let userEntityRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserEntity],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneByOrFail: jest
              .fn()
              .mockImplementation((el) => Promise.resolve(el)),
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
    const user = await service.getUserByEmail('dupa@test.com');
    console.log(user);
    expect(user).toBeDefined();
  });
});
