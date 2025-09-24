'use server';

/**
 * @fileOverview A trading performance report summary AI agent.
 *
 * - generatePerformanceReportSummary - A function that generates a summary of a trading performance report.
 * - GeneratePerformanceReportSummaryInput - The input type for the generatePerformanceReportSummary function.
 * - GeneratePerformanceReportSummaryOutput - The return type for the generatePerformanceReportSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePerformanceReportSummaryInputSchema = z.object({
  reportType: z.enum(['weekly', 'monthly']).describe('The type of report (weekly or monthly).'),
  totalPnl: z.number().describe('The total profit and loss for the period.'),
  winRate: z.number().describe('The win rate for the period (0 to 1).'),
  averagePnl: z.number().describe('The average profit and loss per trade.'),
  maxDrawdown: z.number().describe('The maximum drawdown for the period.'),
  significantTrends: z.string().describe('Any significant trends observed during the period.'),
});
export type GeneratePerformanceReportSummaryInput = z.infer<
  typeof GeneratePerformanceReportSummaryInputSchema
>;

const GeneratePerformanceReportSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, human-readable summary of the trading performance report.'),
});
export type GeneratePerformanceReportSummaryOutput = z.infer<
  typeof GeneratePerformanceReportSummaryOutputSchema
>;

export async function generatePerformanceReportSummary(
  input: GeneratePerformanceReportSummaryInput
): Promise<GeneratePerformanceReportSummaryOutput> {
  return generatePerformanceReportSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePerformanceReportSummaryPrompt',
  input: {schema: GeneratePerformanceReportSummaryInputSchema},
  output: {schema: GeneratePerformanceReportSummaryOutputSchema},
  prompt: `You are an expert financial analyst specializing in summarizing trading performance reports.

  Based on the following data, generate a concise, human-readable summary of the trading performance report, highlighting key insights like total P&L, win rate, and significant trends.  The summary should be no more than three sentences.

  Report Type: {{{reportType}}}
  Total P&L: {{{totalPnl}}}
  Win Rate: {{{winRate}}}
  Average P&L: {{{averagePnl}}}
  Max Drawdown: {{{maxDrawdown}}}
  Significant Trends: {{{significantTrends}}}
  `,
});

const generatePerformanceReportSummaryFlow = ai.defineFlow(
  {
    name: 'generatePerformanceReportSummaryFlow',
    inputSchema: GeneratePerformanceReportSummaryInputSchema,
    outputSchema: GeneratePerformanceReportSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
