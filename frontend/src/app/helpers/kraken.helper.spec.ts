import { KrakenHelper } from './kraken.helper';
import { KrakenCategory } from '../enum/kraken-category.enum';
import { Kraken } from '../models/kraken.model';

const krakenItem = {
  name: 'Test1',
  updated_at: '2024-01-01',
  prices: [10, 20, 30],
  rate: 10,
  category: KrakenCategory.PRODUCT,
};
describe('KrakenHelper', () => {
  describe('getDateFromData', () => {
    it('should correctly get and format the date from column "updated_on"', () => {
      const expectedDate = '2021-09-05';
      const item: Kraken = { updated_on: '44444' } as unknown as Kraken;
      const actualDate = KrakenHelper.getDateFromData(item);
      expect(actualDate).toBe(expectedDate);
    });

    it('should handle missing date properties', () => {
      const item: Kraken = {} as Kraken;
      const actualDate = KrakenHelper.getDateFromData(item);
      expect(actualDate).toBe('');
    });
  });

  describe('getCategoryFromData', () => {
    it('should correctly get the category from column "name"', () => {
      const item: Kraken = { name: 'Equipement XYZ' } as Kraken;
      const actualCategory = KrakenHelper.getCategoryFromData(item);
      expect(actualCategory).toBe(KrakenCategory.EQUIPEMENT);
    });
    it('should correctly get the category from column "Name"', () => {
      const item: Kraken = { Name: 'equipement ABC' } as unknown as Kraken;
      const actualCategory2 = KrakenHelper.getCategoryFromData(item);
      expect(actualCategory2).toBe(KrakenCategory.EQUIPEMENT);
    });

    it('should handle missing name property', () => {
      const item: Kraken = {} as Kraken;
      const actualCategory = KrakenHelper.getCategoryFromData(item);
      expect(actualCategory).toBe(KrakenCategory.EQUIPEMENT);
    });
  });

  describe('getRateFromData', () => {
    it('should correctly get and parse the rate from column "rate"', () => {
      const actualRate = KrakenHelper.getRateFromData(krakenItem);
      expect(actualRate).toBe(10);
    });
    it('should handle falsy rate from column "Rate %"', () => {
      const item: Kraken = { 'Rate %': 'invalid' } as unknown as Kraken;
      const actualRate3 = KrakenHelper.getRateFromData(item);
      expect(actualRate3).toBeNaN();
    });

    it('should correctly get and parse the rate from column "Rate %"', () => {
      const item4: Kraken = { 'Rate %': '-5' } as unknown as Kraken;
      const actualRate4 = KrakenHelper.getRateFromData(item4);
      expect(actualRate4).toBe(-5);
    });

    it('should handle missing rate property', () => {
      const item: Kraken = {} as Kraken;
      const actualRate = KrakenHelper.getRateFromData(item);
      expect(isNaN(actualRate)).toBe(true);
    });
  });

  describe('getPricesFromData', () => {
    it('should correctly get and parse the prices from column "Prices"', () => {
      const item: Kraken = { Prices: '10;20:30' } as unknown as Kraken;
      const actualPrices = KrakenHelper.getPricesFromData(krakenItem);
      expect(actualPrices).toEqual([10, 20, 30]);
    });

    it('should correctly get and parse the prices from column "prices"', () => {
      const item: Kraken = { prices: ['10,20,30'] } as unknown as Kraken;
      const actualPrices2 = KrakenHelper.getPricesFromData(item);
      expect(actualPrices2).toEqual([10, 20, 30]);
    });

    it('should handle wrong prices property from column "prices"', () => {
      const item: Kraken = { prices: 'invalid' } as unknown as Kraken;
      const actualPrices4 = KrakenHelper.getPricesFromData(item);
      expect(actualPrices4).toEqual([0]);
    });

    it('should change negative values to 0 and set it to prices property from column "prices"', () => {
      const item: Kraken = { prices: ['-10,-20,-30'] } as unknown as Kraken;
      const actualPrices5 = KrakenHelper.getPricesFromData(item);
      expect(actualPrices5).toEqual([0, 0, 0]);
    });

    it('should handle missing prices property', () => {
      const item: Kraken = {} as Kraken;
      const actualPrices = KrakenHelper.getPricesFromData(item);
      expect(actualPrices).toEqual([0]);
    });
  });

  describe('findProperty()', () => {
    it('should find the property regardless of case', () => {
      const obj = { Name: 'Test', otherProp: 'value' };
      expect(KrakenHelper.findProperty(obj, ['name'])).toBe('Test');
      expect(KrakenHelper.findProperty(obj, ['Name'])).toBe('Test');
      expect(KrakenHelper.findProperty(obj, ['NAME'])).toBe('Test');
    });

    it('should return undefined if property is not found', () => {
      const obj = { Name: 'Test' };
      expect(KrakenHelper.findProperty(obj, ['age'])).toBeUndefined();
    });
  });
});
