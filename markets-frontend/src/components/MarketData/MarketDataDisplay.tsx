'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MarketDataTable, {
  RowData,
} from '@/components/MarketData/MarketDataTable';
import { getMarketData, TimeType } from '@/app/actions';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ErrorWidget from '../ErrorWidget';

interface MarketDataDisplayProps {
  currencyPairs: string[];
}

export default function MarketDataDisplay({
  currencyPairs,
}: MarketDataDisplayProps) {
  const [currencyPair, setCurrencyPair] = useState<string>(currencyPairs[0]);
  const [data, setData] = useState<RowData[]>([]);
  const [timeType, setTimeType] = useState<TimeType>('hourly');
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  useEffect(() => {
    setStatus('loading');
    getMarketData(currencyPair, timeType)
      .then((data) => {
        setData(data);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [currencyPair, timeType]);

  return (
    <div className="grid gap-6 mx-auto px-4 w-1/2">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select onValueChange={setCurrencyPair}>
            <SelectTrigger className="w-[280px] font-bold">
              <SelectValue placeholder="BTC-USD" />
            </SelectTrigger>
            <SelectContent className="font-bold">
              <SelectGroup>
                {currencyPairs.map((pair) => (
                  <SelectItem key={pair} value={pair}>
                    {pair}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={timeType === 'hourly' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setTimeType('hourly')}
          >
            24H
          </Button>
          <Button
            variant={timeType === 'weekly' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setTimeType('weekly')}
          >
            7D
          </Button>
        </div>
      </header>
      <div>
        {status === 'loading' && (
          <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        {status === 'error' && <ErrorWidget />}

        {status === 'success' && (
          <Card>
            <MarketDataTable rows={data} />
          </Card>
        )}
      </div>
    </div>
  );
}
