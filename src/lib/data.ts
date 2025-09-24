export type Trade = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  pnl: number;
  source: 'MT5' | 'Binance' | 'Exness';
  closed_at: string;
};

export type Report = {
  id: string;
  type: 'Weekly' | 'Monthly';
  from: string;
  to:string;
  summary: string;
  file_url: string;
}

export type EaTrade = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  volume: number;
  entry_price: number;
  exit_price: number;
  pnl: number;
  opened_at: string;
  closed_at: string;
}

// Dashboard Data
export const totalBalance = 125430.50;
export const openPositions = 12;
export const totalPnl = 1250.75;

export const equityData = [
  { date: '2024-05-01', equity: 100000 },
  { date: '2024-05-03', equity: 102000 },
  { date: '2024-05-05', equity: 101500 },
  { date: '2024-05-07', equity: 103000 },
  { date: '2024-05-09', equity: 105500 },
  { date: '2024-05-11', equity: 104000 },
  { date: '2024-05-13', equity: 106500 },
  { date: '2024-05-15', equity: 108000 },
  { date: '2024-05-17', equity: 107500 },
  { date: '2024-05-19', equity: 110000 },
  { date: '2024-05-21', equity: 112500 },
  { date: '2024-05-23', equity: 111000 },
  { date: '2024-05-25', equity: 115000 },
  { date: '2024-05-27', equity: 118000 },
  { date: '2024-05-29', equity: 120000 },
  { date: '2024-05-31', equity: 125430 },
];

export const recentTrades: Trade[] = [
  { id: '1', symbol: 'EUR/USD', side: 'BUY', pnl: 250.50, source: 'MT5', closed_at: '2024-06-05T10:30:00Z' },
  { id: '2', symbol: 'BTC/USDT', side: 'SELL', pnl: -150.00, source: 'Binance', closed_at: '2024-06-05T10:25:00Z' },
  { id: '3', symbol: 'XAU/USD', side: 'BUY', pnl: 500.25, source: 'Exness', closed_at: '2024-06-05T10:20:00Z' },
  { id: '4', symbol: 'GBP/JPY', side: 'BUY', pnl: 320.00, source: 'MT5', closed_at: '2024-06-05T10:15:00Z' },
  { id: '5', symbol: 'ETH/USDT', side: 'SELL', pnl: 80.75, source: 'Binance', closed_at: '2024-06-05T10:10:00Z' },
];

// Reports Data
export const reports: Report[] = [
  { id: '1', type: 'Weekly', from: '2024-05-27', to: '2024-06-02', summary: 'Positive week with strong gains in forex pairs.', file_url: '/reports/weekly-2024-06-02.pdf' },
  { id: '2', type: 'Monthly', from: '2024-05-01', to: '2024-05-31', summary: 'Excellent month, total P&L exceeded targets.', file_url: '/reports/monthly-2024-05-31.pdf' },
  { id: '3', type: 'Weekly', from: '2024-05-20', to: '2024-05-26', summary: 'Slight downturn due to crypto market volatility.', file_url: '/reports/weekly-2024-05-26.pdf' },
];

// EA Performance Data
export const eaPerformance = {
  winRate: 75.5,
  avgPnl: 120.45,
  maxDrawdown: 12.3,
  totalTrades: 150,
};

export const eaTrades: EaTrade[] = [
  { id: 'ea1', symbol: 'EUR/USD', side: 'BUY', volume: 1.0, entry_price: 1.0850, exit_price: 1.0875, pnl: 250, opened_at: '2024-06-05T08:00:00Z', closed_at: '2024-06-05T10:30:00Z' },
  { id: 'ea2', symbol: 'EUR/USD', side: 'SELL', volume: 1.0, entry_price: 1.0890, exit_price: 1.0880, pnl: 100, opened_at: '2024-06-04T14:00:00Z', closed_at: '2024-06-04T16:00:00Z' },
  { id: 'ea3', symbol: 'GBP/USD', side: 'BUY', volume: 0.5, entry_price: 1.2740, exit_price: 1.2720, pnl: -100, opened_at: '2024-06-03T09:00:00Z', closed_at: '2024-06-03T11:00:00Z' },
];

export const eaLogs = `
[2024-06-05 08:00:00] EA_SCALPER_V3 initialized.
[2024-06-05 08:00:01] Market analysis started for EUR/USD.
[2024-06-05 08:00:15] Buy signal detected. Placing order...
[2024-06-05 08:00:16] Order placed: BUY 1.0 EUR/USD @ 1.0850.
[2024-06-05 10:29:50] Take profit level reached. Closing order...
[2024-06-05 10:30:00] Order closed: P&L $250.
[2024-06-05 10:30:01] Monitoring for new signals...
`;
