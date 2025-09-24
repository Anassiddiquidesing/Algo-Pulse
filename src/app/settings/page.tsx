import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TelegramForm } from './telegram-form';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Reporting</CardTitle>
              <CardDescription>Configure and test automated report notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <TelegramForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for MT5, Binance, and Exness.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">API key management will be available here.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage security settings like kill-switch and user roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Security settings will be available here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
