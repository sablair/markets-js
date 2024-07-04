import { Module } from '@nestjs/common';
import { MarketsController } from './markets.controller';
import { HistoricalMarketDataService } from '../services/interface/historicalMarketService';
import { CryptoCompareMarketDataService } from '../services/impl/cryptoCompareMarketDataService';

@Module({
  controllers: [MarketsController],
  providers: [
    {
      provide: HistoricalMarketDataService,
      useClass: CryptoCompareMarketDataService,
    },
  ],
})
export class MarketsModule {}
