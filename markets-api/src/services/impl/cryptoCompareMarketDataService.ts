import { Injectable, Logger } from '@nestjs/common';
import { CurrentMarketDataService } from '../interface/currentMarketDataService';
import { HistoricalMarketDataService } from '../interface/historicalMarketService';
import {
  TimeSpan,
  CurrentPriceInfo,
  MarketInfo,
} from '../common/markets.types';
import { ServiceProviderException } from '../common/exceptions';

@Injectable()
export class CryptoCompareMarketDataService
  implements HistoricalMarketDataService, CurrentMarketDataService
{
  private readonly logger = new Logger(CryptoCompareMarketDataService.name);
  private readonly baseUrls: Record<TimeSpan, string> = {
    hourly: 'https://min-api.cryptocompare.com/data/v2/histohour?limit=24',
    daily: 'https://min-api.cryptocompare.com/data/v2/histoday?limit=7',
  };

  private getBaseUrl(timeType: TimeSpan): string {
    return this.baseUrls[timeType];
  }

  private isCurrencyPairValid(currencyPair: string): string[] {
    const temp = currencyPair.split('-');
    if (temp.length !== 2) {
      return [];
    }
    const isSupportedCurrency = (currency: string) =>
      ['USD', 'BTC', 'ETH'].includes(currency);
    const [baseCurrency, quoteCurrency] = temp;
    if (
      isSupportedCurrency(baseCurrency) &&
      isSupportedCurrency(quoteCurrency)
    ) {
      return temp;
    }

    return [];
  }

  async getCurrentMarketPrice(
    baseCurrencies: string,
    quoteCurrencies: string,
  ): Promise<CurrentPriceInfo> {
    try {
      const API_KEY = process.env.API_KEY;
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${baseCurrencies}&tsyms=${quoteCurrencies}&api_key=${API_KEY}`,
      );
      if (response.ok) {
        return await response.json();
      }

      throw new ServiceProviderException(response.statusText);
    } catch (error) {
      if (error instanceof ServiceProviderException) {
        this.logger.error('Service Provider Error: ', error);
      } else {
        this.logger.error(error);
      }
      throw error;
    }
  }

  async getHistoricalMarketPrice(
    currencyPair: string,
    timeType: TimeSpan = 'hourly',
  ): Promise<MarketInfo[]> {
    const result = this.isCurrencyPairValid(currencyPair.toUpperCase());

    if (result.length !== 2) {
      throw new Error(`Invalid currency pair: ${currencyPair}`);
    }

    const [baseCurrency, quoteCurrency] = result;
    const API_KEY = process.env.API_KEY;
    try {
      const response = await fetch(
        `${this.getBaseUrl(timeType)}&fsym=${baseCurrency}&tsym=${quoteCurrency}&api_key=${API_KEY}`,
      );

      if (response.ok) {
        const { Data } = await response.json();
        return Data.Data.map((d: any) => ({
          high: d.high,
          low: d.low,
          open: d.open,
          close: d.close,
          volumefrom: d.volumefrom,
          volumeto: d.volumeto,
          time: d.time,
        }));
      }

      throw new ServiceProviderException(response.statusText);
    } catch (error) {
      if (error instanceof ServiceProviderException) {
        this.logger.error('Service Provider Error: ', error);
      } else {
        this.logger.error(error);
      }
      throw error;
    }
  }
}
