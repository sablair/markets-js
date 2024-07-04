import { Card } from '../ui/card';

interface PriceWidgetProps {
  baseCurrency: string;
  quoteCurrency: string;
  value: number;
}

/**
 * This can be refactored to take into consideration different currencies
 * */
export default function PriceWidget({
  baseCurrency,
  quoteCurrency,
  value,
}: PriceWidgetProps) {
  return (
    <Card className="p-6 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)}
      </div>
      <div className="text-lg">{`${baseCurrency}-${quoteCurrency}`}</div>
    </Card>
  );
}
