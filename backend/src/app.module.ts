import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KrakenModule } from './application/kraken/kraken.module';

@Module({
  imports: [
    KrakenModule,
    MongooseModule.forRoot(
      'mongodb+srv://kraken_user:dA0E16DAf0rfeo@cluster0.9lb91.mongodb.net/krakenDb',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
