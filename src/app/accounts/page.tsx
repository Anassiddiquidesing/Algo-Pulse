
'use client';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AccountsPage() {
  return (
    <>
      <Header title="Accounts" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Accounts</CardTitle>
              <CardDescription>Manage your API keys for MT5, Binance, and Exness to track performance across all platforms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* MT5 */}
              <div className="space-y-4">
                <div className='space-y-1'>
                  <h3 className="text-lg font-semibold">MetaTrader 5 (MT5)</h3>
                  <p className="text-sm text-muted-foreground">Connect your MT5 account to sync trades and performance.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mt5-account-id">Account ID</Label>
                  <Input id="mt5-account-id" placeholder="Your MT5 Account ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mt5-password">Password</Label>
                  <Input id="mt5-password" type="password" placeholder="Your MT5 Password" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="mt5-server">Server</Label>
                  <Input id="mt5-server" placeholder="Your Broker's Server Name" />
                </div>
                <Button>Connect MT5</Button>
              </div>

              <Separator />

              {/* Binance */}
              <div className="space-y-4">
                 <div className='space-y-1'>
                  <h3 className="text-lg font-semibold">Binance</h3>
                  <p className="text-sm text-muted-foreground">Provide your Binance API keys for trade synchronization.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="binance-api-key">API Key</Label>
                  <Input id="binance-api-key" placeholder="Your Binance API Key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="binance-api-secret">API Secret</Label>
                  <Input id="binance-api-secret" type="password" placeholder="Your Binance API Secret" />
                </div>
                <Button>Connect Binance</Button>
              </div>

              <Separator />

              {/* Exness */}
              <div className="space-y-4">
                <div className='space-y-1'>
                  <h3 className="text-lg font-semibold">Exness</h3>
                  <p className="text-sm text-muted-foreground">Connect your Exness account using your API details.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exness-api-key">API Key / Account ID</Label>
                  <Input id="exness-api-key" placeholder="Your Exness API Key or Account ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exness-api-secret">API Secret / Password</Label>
                  <Input id="exness-api-secret" type="password" placeholder="Your Exness API Secret or Password" />
                </div>
                <Button>Connect Exness</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
