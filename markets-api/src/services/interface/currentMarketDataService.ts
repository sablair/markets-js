import { CurrentPriceInfo } from '../common/markets.types';

export abstract class CurrentMarketDataService {
  abstract getCurrentMarketPrice(
    baseCurrencies: string,
    quoteCurrencies: string,
  ): Promise<CurrentPriceInfo>;
}
