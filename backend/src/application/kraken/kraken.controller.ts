import { Body, Controller, Post } from '@nestjs/common';
import { KrakenService } from './kraken.service';
import { CreateKrakenDto } from './dto/create-kraken.dto';

@Controller('kraken')
export class KrakenController {
  constructor(private readonly krakenService: KrakenService) {}

  @Post()
  async createMany(@Body() createKrakenDto: CreateKrakenDto[]) {
    return this.krakenService.createMany(createKrakenDto);
  }
}
