'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from '@/components/ui/chart';
import { equityData } from '@/lib/data';

const chartConfig = {
  equity: {
    label: 'Equity',
    color: 'hsl(var(--primary))',
  },
};

export function DashboardChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full sm:h-[250px]">
      <BarChart accessibilityLayer data={equityData}>
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="equity" fill="var(--color-equity)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
