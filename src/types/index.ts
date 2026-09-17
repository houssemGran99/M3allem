import { TranslationKey } from '../i18n/translations';

export type Tint = 'brand' | 'amber' | 'blue' | 'ochre';

export type TradeCategory = {
  id: string;
  nameKey: TranslationKey;
  countKey: TranslationKey;
  icon: string;
  tint: 'blue' | 'amber' | 'brand' | 'sub';
};

export type Credential = {
  id: string;
  labelKey: TranslationKey;
  status: 'live' | 'pending';
};

export type Artisan = {
  id: string;
  name: string;
  initials: string;
  avatarTint: Tint;
  roleKey: TranslationKey;
  rating: number;
  reviewCount: number;
  jobCount: number;
  replyTimeKey: TranslationKey;
  priceMin: number;
  priceMax: number;
  verified: boolean;
  credentials: Credential[];
};

export type Quote = {
  id: string;
  artisanId: string;
  artisanName: string;
  initials: string;
  avatarTint: Tint;
  price: number;
  rating: number;
  distanceKm: number;
  noteKey?: TranslationKey;
  timeKey: TranslationKey;
  highlighted?: boolean;
};

export type LeadStatus = 'urgent' | 'recurring' | 'new';

export type WorkerLead = {
  id: string;
  status: LeadStatus;
  titleKey: TranslationKey;
  area: string;
  distanceKm: number;
  postedKey: TranslationKey;
  budgetKey?: TranslationKey;
  unlockCost: number;
  unlocked: boolean;
};

export type MyQuoteStatus = 'pending' | 'accepted';

export type MyQuoteEntry = {
  id: string;
  titleKey: TranslationKey;
  clientName: string;
  price: number;
  status: MyQuoteStatus;
  sentKey: TranslationKey;
  highlighted?: boolean;
};

export type CreditPack = {
  id: string;
  nameKey: TranslationKey;
  credits: number;
  price: number;
  subKey: TranslationKey;
  popular?: boolean;
};

export type AEStepState = 'done' | 'now' | 'upcoming';

export type AEStep = {
  id: string;
  titleKey: TranslationKey;
  subKey: TranslationKey;
  state: AEStepState;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  textKey: TranslationKey;
};
