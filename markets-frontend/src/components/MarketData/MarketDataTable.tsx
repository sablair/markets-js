import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export interface RowData {
  high: number;
  low: number;
  open: number;
  close: number;
  volumefrom: number;
  volumeto: number;
  time: number;
}

interface TableProps {
  rows: RowData[];
}

export default function MarketDataTable({ rows }: TableProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Assuming time is in seconds
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-200">
          {[
            'Date Time',
            'Low',
            'High',
            'Open',
            'Close',
            'Volume From',
            'Volume To',
          ].map((head) => (
            <TableHead key={head} className="font-bold text-black text-base">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.time}>
            <TableCell>{formatDate(row.time)}</TableCell>
            <TableCell className="text-right">{row.low}</TableCell>
            <TableCell className="text-right">{row.high}</TableCell>
            <TableCell className="text-right">{row.open}</TableCell>
            <TableCell className="text-right">{row.close}</TableCell>
            <TableCell className="text-right">{row.volumefrom}</TableCell>
            <TableCell className="text-right">
              {row.volumeto.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                notation: 'compact',
                compactDisplay: 'short',
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
