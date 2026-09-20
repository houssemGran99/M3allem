export type Bilingual = { fr: string; ar: string };

export type ApiUser = {
  _id: string;
  name: string;
  email: string;
  role: 'client' | 'worker';
  phone?: string;
  city?: string;
  language: 'fr' | 'ar';
};

export type ApiCredential = {
  type: 'cin' | 'ae' | 'referral' | 'cnss';
  label: Bilingual;
  status: 'live' | 'pending';
};

export type ApiAEStep = {
  key: string;
  title: Bilingual;
  sub: Bilingual;
  state: 'done' | 'now' | 'upcoming';
};

export type ApiArtisanProfile = {
  _id: string;
  user: string;
  roleLabel: Bilingual;
  categories: ApiCategory[] | string[];
  area: string;
  priceMin: number;
  priceMax: number;
  verified: boolean;
  credentials: ApiCredential[];
  ratingSum: number;
  ratingCount: number;
  rating: number;
  jobCount: number;
  completionPct: number;
  onTimePct: number;
  replyTimeMinutes: number;
  creditBalance: number;
  aeJourney: ApiAEStep[];
};

export type ApiCategory = {
  _id: string;
  slug: string;
  name: Bilingual;
  icon: string;
  tint: 'blue' | 'amber' | 'brand' | 'sub';
};

export type ApiAddress = { line: string; city: string; lat?: number; lng?: number };

export type ApiRequestStatus = 'open' | 'accepted' | 'completed' | 'cancelled';

export type ApiServiceRequest = {
  _id: string;
  client: string | ApiUser;
  category: ApiCategory | string;
  description: string;
  photos: string[];
  address: ApiAddress;
  budgetMin?: number;
  budgetMax?: number;
  status: ApiRequestStatus;
  unlockedBy: string[];
  acceptedQuote?: string | ApiQuote;
  createdAt: string;
};

export type ApiLead = {
  _id: string;
  category: ApiCategory;
  status: ApiRequestStatus;
  budgetMin?: number;
  budgetMax?: number;
  city: string;
  createdAt: string;
  unlocked: boolean;
  description?: string;
  photos?: string[];
  address?: ApiAddress;
  client?: { _id: string; name: string; phone?: string };
};

export type ApiQuoteStatus = 'pending' | 'accepted' | 'declined';

export type ApiQuote = {
  _id: string;
  request: string | ApiServiceRequest;
  artisan: string | ApiUser;
  price: number;
  timeSlot: string;
  message?: string;
  status: ApiQuoteStatus;
  createdAt: string;
};

export type ApiCreditPack = {
  _id: string;
  name: Bilingual;
  credits: number;
  price: number;
  popular: boolean;
};

export type ApiReview = {
  _id: string;
  request: string;
  client: string | { _id: string; name: string };
  artisan: string;
  rating: number;
  text?: string;
  createdAt: string;
};
