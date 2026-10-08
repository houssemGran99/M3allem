import { apiFetch } from './client';
import { ApiAEStep } from './types';

export function getJourney() {
  return apiFetch<{ aeJourney: ApiAEStep[] }>('/ae-journey');
}

export function advanceJourney() {
  return apiFetch<{ aeJourney: ApiAEStep[] }>('/ae-journey/advance', { method: 'POST' });
}
