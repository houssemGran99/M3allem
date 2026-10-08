import { apiFetch } from './client';
import { ApiCreditPack } from './types';

export function getBalance() {
  return apiFetch<{ creditBalance: number }>('/credits/balance');
}

export function listPacks() {
  return apiFetch<{ packs: ApiCreditPack[] }>('/credits/packs', { auth: false });
}

export function purchase(packId: string) {
  return apiFetch<{ creditBalance: number }>('/credits/purchase', { method: 'POST', body: { packId } });
}
