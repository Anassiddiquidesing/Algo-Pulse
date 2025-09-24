'use server';

import {
  generatePerformanceReportSummary,
  GeneratePerformanceReportSummaryInput,
} from '@/ai/flows/generate-performance-report-summary';
import {
  automateTelegramReportWithAISummary,
  AutomateTelegramReportWithAISummaryInput,
} from '@/ai/flows/automate-telegram-report-with-ai-summary';
import { z } from 'zod';

const generateReportSchema = z.object({
  reportType: z.enum(['weekly', 'monthly']),
  totalPnl: z.coerce.number(),
  winRate: z.coerce.number(),
  averagePnl: z.coerce.number(),
  maxDrawdown: z.coerce.number(),
  significantTrends: z.string(),
});

export async function handleGenerateReport(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const validation = generateReportSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const input: GeneratePerformanceReportSummaryInput = validation.data;

  try {
    const result = await generatePerformanceReportSummary(input);
    return {
      success: true,
      summary: result.summary,
      message: 'Report summary generated successfully.',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to generate report summary.',
    };
  }
}

const sendTelegramSchema = z.object({
  reportSummary: z.string().min(1, 'Summary is required.'),
  reportLink: z.string().url('A valid URL is required.'),
  telegramChatId: z.string().min(1, 'Telegram Chat ID is required.'),
});

export async function handleSendTelegramReport(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validation = sendTelegramSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const input: AutomateTelegramReportWithAISummaryInput = validation.data;

  try {
    const result = await automateTelegramReportWithAISummary(input);
    if (result.success) {
      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending the Telegram message.',
    };
  }
}
