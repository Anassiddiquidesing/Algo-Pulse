'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleGenerateReport } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  reportType: z.enum(['weekly', 'monthly']),
  totalPnl: z.coerce.number(),
  winRate: z.coerce.number().min(0).max(100),
  averagePnl: z.coerce.number(),
  maxDrawdown: z.coerce.number(),
  significantTrends: z.string().min(1, 'This field is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function GenerateReportForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: 'weekly',
      totalPnl: 1250,
      winRate: 75,
      averagePnl: 120,
      maxDrawdown: 12,
      significantTrends: 'Strong performance in major FX pairs, crypto assets were volatile.'
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = await handleGenerateReport(formData);
    
    if (result.success) {
      toast({
        title: 'Success!',
        description: 'AI Report Summary Generated: ' + result.summary,
      });
      reset();
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate AI Report Summary</DialogTitle>
          <DialogDescription>
            Fill in the details to generate an AI-powered summary of the performance report.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reportType" className="text-right">Report Type</Label>
            <Select onValueChange={(value: 'weekly' | 'monthly') => setValue('reportType', value)} defaultValue="weekly">
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalPnl" className="text-right">Total P&L</Label>
            <Input id="totalPnl" type="number" {...register('totalPnl')} className="col-span-3" />
            {errors.totalPnl && <p className="col-span-4 text-red-500 text-xs text-right">{errors.totalPnl.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="winRate" className="text-right">Win Rate (%)</Label>
            <Input id="winRate" type="number" {...register('winRate')} className="col-span-3" />
            {errors.winRate && <p className="col-span-4 text-red-500 text-xs text-right">{errors.winRate.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="averagePnl" className="text-right">Average P&L</Label>
            <Input id="averagePnl" type="number" {...register('averagePnl')} className="col-span-3" />
            {errors.averagePnl && <p className="col-span-4 text-red-500 text-xs text-right">{errors.averagePnl.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxDrawdown" className="text-right">Max Drawdown (%)</Label>
            <Input id="maxDrawdown" type="number" {...register('maxDrawdown')} className="col-span-3" />
            {errors.maxDrawdown && <p className="col-span-4 text-red-500 text-xs text-right">{errors.maxDrawdown.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="significantTrends" className="text-right">Trends</Label>
            <Textarea id="significantTrends" {...register('significantTrends')} className="col-span-3" />
            {errors.significantTrends && <p className="col-span-4 text-red-500 text-xs text-right">{errors.significantTrends.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
