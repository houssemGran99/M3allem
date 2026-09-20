import { apiFetch } from './client';
import { ApiCategory } from './types';

export function listCategories() {
  return apiFetch<{ categories: ApiCategory[] }>('/categories', { auth: false });
}
