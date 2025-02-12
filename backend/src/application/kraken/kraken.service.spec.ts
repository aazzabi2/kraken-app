import { Test, TestingModule } from '@nestjs/testing';
import { KrakenService } from './kraken.service';
import { getModelToken } from '@nestjs/mongoose';
import { Kraken } from './schemas/kraken.schema';
import { Model } from 'mongoose';
import { KrakenCategory } from './enums/kraken-category.enum';

describe('KrakenService', () => {
  let service: KrakenService;
  let model: Model<Kraken>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KrakenService,
        {
          provide: getModelToken('Kraken'),
          useValue: {
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<KrakenService>(KrakenService);
    model = module.get<Model<Kraken>>(getModelToken('Kraken'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create multiple Kraken items', async () => {
    const krakens: Kraken[] = [
      {
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [1, 2, 3],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
      {
        name: 'Test2',
        updated_at: '2024-01-02',
        prices: [4, 5, 6],
        rate: 20,
        category: KrakenCategory.PRODUCT,
      },
    ];

    const expectedResult = [
      {
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [1, 2, 3],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
      {
        name: 'Test2',
        updated_at: '2024-01-02',
        prices: [4, 5, 6],
        rate: 20,
        category: KrakenCategory.PRODUCT,
      },
    ];

    (model.insertMany as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.createMany(krakens);

    expect(model.insertMany).toHaveBeenCalledWith(krakens);
    expect(result).toEqual(expectedResult);
  });

  it('should handle other errors', async () => {
    const krakens: Kraken[] = [
      {
        name: 'Test1',
        updated_at: '2024-01-01',
        prices: [1, 2, 3],
        rate: 10,
        category: KrakenCategory.PRODUCT,
      },
    ];

    const errorMessage = 'Some other database error';

    (model.insertMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(service.createMany(krakens)).rejects.toThrow(Error);
  });
});
