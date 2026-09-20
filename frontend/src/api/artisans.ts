import { apiFetch } from './client';
import { ApiArtisanProfile, ApiReview, ApiUser } from './types';

export function getArtisan(id: string) {
  return apiFetch<{ user: ApiUser; profile: ApiArtisanProfile; reviews: ApiReview[] }>(`/artisans/${id}`, {
    auth: false,
  });
}
