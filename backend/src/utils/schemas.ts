import { z } from 'zod';

export const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

export const bilingualString = z.object({
  fr: z.string().min(1),
  ar: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['client', 'worker']),
  phone: z.string().min(6).optional(),
  city: z.string().min(1).optional(),
  language: z.enum(['fr', 'ar']).optional(),
  artisan: z
    .object({
      roleLabel: bilingualString,
      area: z.string().min(1),
      priceMin: z.number().nonnegative(),
      priceMax: z.number().nonnegative(),
      categoryIds: z.array(objectIdString).default([]),
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createRequestSchema = z.object({
  categoryId: objectIdString,
  description: z.string().min(5),
  photos: z.array(z.string()).default([]),
  address: z.object({
    line: z.string().min(1),
    city: z.string().min(1),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  budgetMin: z.number().nonnegative().optional(),
  budgetMax: z.number().nonnegative().optional(),
});

export const createQuoteSchema = z.object({
  price: z.number().positive(),
  timeSlot: z.string().min(1),
  message: z.string().optional(),
});

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().optional(),
});

export const purchaseCreditsSchema = z.object({
  packId: objectIdString,
});

export const idParamSchema = z.object({
  id: objectIdString,
});

export const requestQuoteParamSchema = z.object({
  id: objectIdString,
  quoteId: objectIdString,
});
