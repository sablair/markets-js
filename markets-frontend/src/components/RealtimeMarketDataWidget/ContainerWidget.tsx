'use client';

import React, { useEffect, useState, useTransition } from 'react';
import PriceWidget from './PriceWidget';
import { Skeleton } from '../ui/skeleton';
import ErrorWidget from '../ErrorWidget';

interface ContainerWidgetProps {
  baseCurrencies: string;
  quoteCurrencies: string;
}

/**
 * Data structure returned from server
 * {
 *    "BTC": {
 *      "USD": 10000
 *    }
 * }
 */
type CurrentPriceInfo = { [Name: string]: { [Name: string]: number } };

///Parent component responsible for getting information from the server
///and passing it to the child components
export default function ContainerWidget({
  baseCurrencies,
  quoteCurrencies,
}: ContainerWidgetProps): JSX.Element {
  const [results, setResults] = useState<CurrentPriceInfo>({});
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3001/realtime/${baseCurrencies}/${quoteCurrencies}`
    );

    eventSource.onmessage = (event) => {
      setResults(JSON.parse(event.data));
      setStatus('success');
    };

    eventSource.onerror = () => {
      setStatus('error');
    };

    return () => {
      eventSource.close();
    };
  }, [baseCurrencies, quoteCurrencies]);

  return (
    <div className="container mx-auto p-4 w-1/2 rounded-xl">
      {status === 'loading' && (
        <Skeleton className="w-full h-[125px] rounded-xl" />
      )}
      {status === 'success' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(results).map(([key, value]) => (
              <PriceWidget
                key={key}
                baseCurrency={key}
                quoteCurrency={Object.entries(value)[0][0]}
                value={Object.entries(value)[0][1]}
              />
            ))}
          </div>
        </>
      )}
      {status === 'error' && <ErrorWidget />}
    </div>
  );
}
