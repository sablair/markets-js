'use server';

export type TimeType = 'hourly' | 'weekly';

export async function getMarketData(currencyPair: string, timeType: TimeType) {
  const result = await fetch(
    `http://localhost:3001/markets/${currencyPair}/${timeType}/`
  );
  if (!result.ok) {
    throw new Error('Failed to fetch data');
  } else {
    return result.json();
  }
}
