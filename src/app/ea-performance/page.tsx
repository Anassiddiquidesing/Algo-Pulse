'use client';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { eaPerformance, eaTrades, eaLogs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Percent, Target, TrendingDown, ClipboardList, RefreshCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function EaPerformancePage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000); // Updates every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header title="EA Performance" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>EA Performance: SCALPER_V3</CardTitle>
                <CardDescription>Detailed performance metrics for the selected Expert Advisor.</CardDescription>
              </div>
               <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
                <Button variant="outline" size="icon" onClick={() => setLastUpdated(new Date())}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eaPerformance.winRate}%</div>
                <p className="text-xs text-muted-foreground">Based on {eaPerformance.totalTrades} trades</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average P&L</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eaPerformance.avgPnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <p className="text-xs text-muted-foreground">Per trade average</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eaPerformance.maxDrawdown}%</div>
                <p className="text-xs text-muted-foreground">Peak-to-trough decline</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eaPerformance.totalTrades}</div>
                <p className="text-xs text-muted-foreground">In the last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trades History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Side</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead className="text-right">P&L</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eaTrades.map(trade => (
                        <TableRow key={trade.id}>
                          <TableCell>{trade.symbol}</TableCell>
                          <TableCell>
                             <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'} className={trade.side === 'BUY' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' : 'bg-red-500/20 text-red-700 hover:bg-red-500/30'}>{trade.side}</Badge>
                          </TableCell>
                          <TableCell>{trade.volume.toFixed(2)}</TableCell>
                          <TableCell className={`text-right ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trade.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Runtime Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 w-full">
                  <pre className="text-xs bg-muted p-4 rounded-md font-mono">{eaLogs}</pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
