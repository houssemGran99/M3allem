import { apiFetch } from './client';
import { ApiLead } from './types';

export function listLeads() {
  return apiFetch<{ leads: ApiLead[]; unlockCost: number; creditBalance: number }>('/leads');
}

export function unlockLead(id: string) {
  return apiFetch<{ request: ApiLead; creditBalance: number }>(`/leads/${id}/unlock`, { method: 'POST' });
}
