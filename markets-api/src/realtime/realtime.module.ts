import { Module } from '@nestjs/common';
import { RealtimeController } from './realtime.controller';
import { CryptoCompareMarketDataService } from '../services/impl/cryptoCompareMarketDataService';
import { CurrentMarketDataService } from '../services/interface/currentMarketDataService';

@Module({
  controllers: [RealtimeController],
  providers: [
    {
      provide: CurrentMarketDataService,
      useClass: CryptoCompareMarketDataService,
    },
  ],
})
export class RealtimeModule {}
