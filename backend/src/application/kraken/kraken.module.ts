import { Module } from '@nestjs/common';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KrakenSchema } from './schemas/kraken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Kraken', schema: KrakenSchema }]),
  ],
  controllers: [KrakenController],
  providers: [KrakenService],
})
export class KrakenModule {}
