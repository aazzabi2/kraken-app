import { Schema, Document } from 'mongoose';
import { KrakenCategory } from '../enums/kraken-category.enum';

export interface Kraken {
  name: string;
  updated_at: string;
  prices: number[];
  rate: number;
  category: KrakenCategory.PRODUCT | KrakenCategory.EQUIPEMENT;
}

export interface KrakenDocument extends Kraken, Document {}

export const KrakenSchema = new Schema<Kraken>({
  name: { type: String, required: true, unique: true },
  updated_at: { type: String, required: true },
  prices: { type: [Number], required: true },
  rate: { type: Number, required: true },
  category: {
    type: String,
    enum: [KrakenCategory.PRODUCT, KrakenCategory.EQUIPEMENT],
    required: true,
  },
});
