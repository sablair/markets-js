import { Controller, Param, Sse } from '@nestjs/common';
import { Observable, from, interval, map, switchMap } from 'rxjs';
import { CurrentMarketDataService } from '../services/interface/currentMarketDataService';

@Controller('realtime')
export class RealtimeController {
  private readonly INTERVAL = 5000;

  constructor(private readonly _marketDataService: CurrentMarketDataService) {}

  @Sse(':baseCurrencies/:quoteCurrencies')
  sse(
    @Param('baseCurrencies') baseCurrencies: string,
    @Param('quoteCurrencies') quoteCurrencies: string,
  ): Observable<MessageEvent> {
    return interval(this.INTERVAL).pipe(
      switchMap(() => {
        return from(
          this._marketDataService.getCurrentMarketPrice(
            baseCurrencies,
            quoteCurrencies,
          ),
        );
      }),
      map((val) => {
        return {
          data: val,
        } as MessageEvent;
      }),
    );
  }
}
