import { apiFetch } from './client';
import { ApiArtisanProfile, ApiUser } from './types';

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: 'client' | 'worker';
  phone?: string;
  city?: string;
  language?: 'fr' | 'ar';
  artisan?: {
    roleLabel: { fr: string; ar: string };
    area: string;
    priceMin: number;
    priceMax: number;
    categoryIds: string[];
  };
};

export function register(payload: RegisterPayload) {
  return apiFetch<{ token: string; user: ApiUser }>('/auth/register', {
    method: 'POST',
    body: payload,
    auth: false,
  });
}

export function login(email: string, password: string) {
  return apiFetch<{ token: string; user: ApiUser }>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export function me() {
  return apiFetch<{ user: ApiUser; artisanProfile?: ApiArtisanProfile }>('/auth/me');
}
