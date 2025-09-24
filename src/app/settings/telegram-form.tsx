'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleSendTelegramReport } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  reportSummary: z.string().min(1, 'Summary is required.'),
  reportLink: z.string().url('A valid URL is required.'),
  telegramChatId: z.string().min(1, 'Telegram Chat ID is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function TelegramForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportSummary: "This week's trading resulted in a net profit of $1,250 with a 75% win rate. Key drivers were long positions in EUR/USD and short-term scalps on XAU/USD.",
      reportLink: "https://example.com/report.pdf",
      telegramChatId: "",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = await handleSendTelegramReport(formData);

    if (result.success) {
      toast({
        title: 'Success!',
        description: result.message,
      });
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Send Telegram Report</CardTitle>
        <CardDescription>
          Send a test message to your Telegram channel with an AI-generated summary. You will need to provide your Telegram Bot Token in the environment variables.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
            <Input id="telegramChatId" {...register('telegramChatId')} placeholder="e.g., -1001234567890" />
            {errors.telegramChatId && <p className="text-red-500 text-xs">{errors.telegramChatId.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reportLink">Report Link</Label>
            <Input id="reportLink" {...register('reportLink')} />
            {errors.reportLink && <p className="text-red-500 text-xs">{errors.reportLink.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reportSummary">AI Summary</Label>
            <Textarea id="reportSummary" {...register('reportSummary')} rows={4} />
            {errors.reportSummary && <p className="text-red-500 text-xs">{errors.reportSummary.message}</p>}
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Test Message'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
