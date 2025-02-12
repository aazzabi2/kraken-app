import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kraken, KrakenDocument } from './schemas/kraken.schema';

@Injectable()
export class KrakenService {
  constructor(
    @InjectModel('Kraken') private krakenModel: Model<KrakenDocument>,
  ) {}

  async createMany(krakens: Kraken[]): Promise<Kraken[]> {
    try {
      return this.krakenModel.insertMany(krakens);
    } catch (error) {
      console.log(error);
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw error;
    }
  }
}
