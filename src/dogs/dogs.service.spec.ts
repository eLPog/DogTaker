import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DogsService } from './dogs.service';
import { DogsEntity } from './dogs.entity';

describe('UserService', () => {
  let service: DogsService;
  let dogEntityRepository: Repository<DogsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DogsEntity],
      providers: [
        DogsService,
        {
          provide: getRepositoryToken(DogsEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
    dogEntityRepository = module.get<Repository<DogsEntity>>(
      getRepositoryToken(DogsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('user repository should be defined', () => {
    expect(dogEntityRepository).toBeDefined();
  });
  test('find dog by id', async () => {
    const dog = await dogEntityRepository.findOneByOrFail({
      dogID: '7f2dcf05-3ae7-45ae-bef9-5f59f524eac6',
    });
    expect(dog).toBeDefined();
  });
});
