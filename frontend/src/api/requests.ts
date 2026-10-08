import { apiFetch } from './client';
import { ApiArtisanProfile, ApiQuote, ApiServiceRequest, ApiReview } from './types';

export type CreateRequestPayload = {
  categoryId: string;
  description: string;
  photos: string[];
  address: { line: string; city: string; lat?: number; lng?: number };
  budgetMin?: number;
  budgetMax?: number;
};

export function createRequest(payload: CreateRequestPayload) {
  return apiFetch<{ request: ApiServiceRequest }>('/requests', { method: 'POST', body: payload });
}

export function listMyRequests() {
  return apiFetch<{ requests: ApiServiceRequest[] }>('/requests/mine');
}

export function getRequest(id: string) {
  return apiFetch<{ request: ApiServiceRequest }>(`/requests/${id}`);
}

export function listQuotesForRequest(id: string) {
  return apiFetch<{ quotes: { quote: ApiQuote; artisanProfile: ApiArtisanProfile | null }[] }>(
    `/requests/${id}/quotes`
  );
}

export function acceptQuote(requestId: string, quoteId: string) {
  return apiFetch<{ request: ApiServiceRequest; quote: ApiQuote }>(
    `/requests/${requestId}/quotes/${quoteId}/accept`,
    { method: 'PATCH' }
  );
}

export function completeRequest(id: string) {
  return apiFetch<{ request: ApiServiceRequest }>(`/requests/${id}/complete`, { method: 'POST' });
}

export function reviewRequest(id: string, rating: number, text?: string) {
  return apiFetch<{ review: ApiReview }>(`/requests/${id}/review`, {
    method: 'POST',
    body: { rating, text },
  });
}
