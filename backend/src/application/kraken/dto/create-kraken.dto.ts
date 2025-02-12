import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { KrakenCategory } from '../enums/kraken-category.enum';

export class CreateKrakenDto {
  @IsString()
  name: string;

  @IsString()
  updated_at: string;

  @IsArray()
  @IsNumber({}, { each: true })
  prices: number[];

  @IsNumber()
  rate: number;

  @IsEnum([KrakenCategory.PRODUCT, KrakenCategory.EQUIPEMENT])
  category: KrakenCategory.PRODUCT | KrakenCategory.EQUIPEMENT;

  @IsOptional()
  _id: string;
}
