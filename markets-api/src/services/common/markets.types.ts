export type TimeSpan = 'hourly' | 'daily';

export interface MarketInfo {
  high: number;
  low: number;
  open: number;
  close: number;
  volumefrom: number;
  volumeto: number;
  time: number;
}

export type CurrentPriceInfo = { [Name: string]: { [Name: string]: number } };
