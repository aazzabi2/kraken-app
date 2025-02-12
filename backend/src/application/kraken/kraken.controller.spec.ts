import { Test, TestingModule } from '@nestjs/testing';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';
import { CreateKrakenDto } from './dto/create-kraken.dto';
import { KrakenCategory } from './enums/kraken-category.enum';
import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('KrakenController', () => {
  let controller: KrakenController;
  let service: KrakenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KrakenController],
      providers: [
        KrakenService,
        CreateKrakenDto,
        {
          provide: getModelToken('Kraken'),
          useValue: {
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KrakenController>(KrakenController);
    service = module.get<KrakenService>(KrakenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createMany and return the result', async () => {
    const createKrakenDtos: CreateKrakenDto[] = [
      {
        _id: '1111',
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
    ];

    const expectedResult = [
      {
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
    ];

    jest.spyOn(service, 'createMany').mockResolvedValue(expectedResult);

    const result = await controller.createMany(createKrakenDtos);

    expect(service.createMany).toHaveBeenCalledWith(createKrakenDtos);
    expect(result).toEqual(expectedResult);
  });

  it('should handle errors correctly', async () => {
    const createKrakenDtos: CreateKrakenDto[] = [
      {
        _id: '1111',
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
    ];

    const errorMessage = 'Duplicate key error: name - {"name":"Test1"}';
    const conflictException = new ConflictException({
      message: errorMessage,
      duplicatedItems: createKrakenDtos,
    });

    jest.spyOn(service, 'createMany').mockRejectedValue(conflictException);

    await expect(controller.createMany(createKrakenDtos)).rejects.toThrow(
      ConflictException,
    );
  });
});
