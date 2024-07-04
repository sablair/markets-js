import MarketDataDisplay from '@/components/MarketData/MarketDataDisplay';
import RealtimeMarketDataWidget from '@/components/RealtimeMarketDataWidget';

export default async function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center py-8">Market Data Board</h1>
      <div>
        <h2 className="text-2xl font-bold text-center py-8">
          Realtime Market Data
        </h2>
        <RealtimeMarketDataWidget
          baseCurrencies="BTC,ETH"
          quoteCurrencies="USD"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center py-8">
          Historical Market Data
        </h2>
        <MarketDataDisplay currencyPairs={['BTC-USD', 'ETH-USD']} />
      </div>
    </main>
  );
}
