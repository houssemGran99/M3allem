import { apiFetch } from './client';
import { ApiQuote } from './types';

export type SubmitQuotePayload = { price: number; timeSlot: string; message?: string };

export function submitQuote(requestId: string, payload: SubmitQuotePayload) {
  return apiFetch<{ quote: ApiQuote }>(`/requests/${requestId}/quotes`, { method: 'POST', body: payload });
}

export function listMyQuotes() {
  return apiFetch<{ quotes: ApiQuote[] }>('/quotes/mine');
}
