import { TimeSpan, MarketInfo } from '../common/markets.types';

export abstract class HistoricalMarketDataService {
  abstract getHistoricalMarketPrice(
    currencyPair: string,
    timeType: TimeSpan,
  ): Promise<MarketInfo[]>;
}
