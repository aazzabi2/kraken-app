import { KrakenCategory } from '../enum/kraken-category.enum';

export interface Kraken {
  name: string;
  updated_at: string;
  prices: number[];
  rate: number;
  category: KrakenCategory.PRODUCT | KrakenCategory.EQUIPEMENT;
}
