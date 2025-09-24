'use server';

/**
 * @fileOverview A flow to automate sending Telegram messages with AI-summarized trading performance reports.
 *
 * - automateTelegramReportWithAISummary - Orchestrates the process of generating a report summary using AI and sending it via Telegram.
 * - AutomateTelegramReportWithAISummaryInput - The input type for the automateTelegramReportWithAISummary function.
 * - AutomateTelegramReportWithAISummaryOutput - The return type for the automateTelegramReportWithAISummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateTelegramReportWithAISummaryInputSchema = z.object({
  reportSummary: z.string().describe('The trading performance report summary.'),
  reportLink: z.string().describe('A link to the full PDF report.'),
  telegramChatId: z.string().describe('The Telegram chat ID to send the message to.'),
});
export type AutomateTelegramReportWithAISummaryInput = z.infer<typeof AutomateTelegramReportWithAISummaryInputSchema>;

const AutomateTelegramReportWithAISummaryOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the Telegram message was sent successfully.'),
  message: z.string().describe('A message indicating the status of the Telegram message sending process.'),
});
export type AutomateTelegramReportWithAISummaryOutput = z.infer<typeof AutomateTelegramReportWithAISummaryOutputSchema>;

async function sendTelegramMessage(chatId: string, message: string): Promise<boolean> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!telegramBotToken) {
    console.error('Telegram bot token is not set.');
    return false;
  }

  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to send Telegram message: ${response.status} ${response.statusText}`);
      return false;
    }

    const data = await response.json();
    console.log('Telegram message sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

export async function automateTelegramReportWithAISummary(
  input: AutomateTelegramReportWithAISummaryInput
): Promise<AutomateTelegramReportWithAISummaryOutput> {
  return automateTelegramReportWithAISummaryFlow(input);
}

const automateTelegramReportWithAISummaryFlow = ai.defineFlow(
  {
    name: 'automateTelegramReportWithAISummaryFlow',
    inputSchema: AutomateTelegramReportWithAISummaryInputSchema,
    outputSchema: AutomateTelegramReportWithAISummaryOutputSchema,
  },
  async input => {
    const telegramMessage = `Here's your weekly trading performance report summary:\n${input.reportSummary}\n\nFull report: ${input.reportLink}`;

    const success = await sendTelegramMessage(input.telegramChatId, telegramMessage);

    if (success) {
      return {
        success: true,
        message: 'Telegram message sent successfully.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to send Telegram message.',
      };
    }
  }
);
