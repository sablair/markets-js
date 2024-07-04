import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ServiceUnavailableException,
} from '@nestjs/common';
import { MarketInfo, TimeSpan } from '../services/common/markets.types';
import { HistoricalMarketDataService } from '../services/interface/historicalMarketService';
import { ServiceProviderException } from 'src/services/common/exceptions';

@Controller('markets')
export class MarketsController {
  constructor(
    private readonly _marketDataService: HistoricalMarketDataService,
  ) {}

  private async getMarketData(
    currencyPair: string,
    timeType: TimeSpan,
  ): Promise<MarketInfo[]> {
    try {
      return await this._marketDataService.getHistoricalMarketPrice(
        currencyPair,
        timeType,
      );
    } catch (error) {
      const msg =
        'The service is currently unavailable. Please try again later.';
      if (error instanceof ServiceProviderException) {
        throw new ServiceUnavailableException(msg);
      } else {
        throw new BadRequestException(msg);
      }
    }
  }

  @Get(':currencyPair/hourly')
  async getHourlyMarketData(
    @Param('currencyPair') currencyPair: string,
  ): Promise<MarketInfo[]> {
    return await this.getMarketData(currencyPair, 'hourly');
  }

  @Get(':currencyPair/weekly')
  async getDailyMarketData(
    @Param('currencyPair') currencyPair: string,
  ): Promise<MarketInfo[]> {
    return await this.getMarketData(currencyPair, 'daily');
  }
}
