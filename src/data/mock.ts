import {
  AEStep,
  Artisan,
  CreditPack,
  MyQuoteEntry,
  Quote,
  Review,
  TradeCategory,
  WorkerLead,
} from '../types';

export const categories: TradeCategory[] = [
  { id: 'plumbing', nameKey: 'cat_plumb', countKey: 'cat_plumb_n', icon: 'droplet', tint: 'blue' },
  { id: 'electrical', nameKey: 'cat_elec', countKey: 'cat_elec_n', icon: 'zap', tint: 'amber' },
  { id: 'cleaning', nameKey: 'cat_clean', countKey: 'cat_clean_n', icon: 'wind', tint: 'brand' },
  { id: 'handyman', nameKey: 'cat_handy', countKey: 'cat_handy_n', icon: 'tool', tint: 'sub' },
  { id: 'climate', nameKey: 'cat_clim', countKey: 'cat_clim_n', icon: 'thermometer', tint: 'sub' },
  { id: 'paint', nameKey: 'cat_paint', countKey: 'cat_paint_n', icon: 'edit-3', tint: 'sub' },
];

export const mohamed: Artisan = {
  id: 'mohamed-belhaj',
  name: 'Mohamed Belhaj',
  initials: 'MB',
  avatarTint: 'brand',
  roleKey: 'c4_role',
  rating: 4.9,
  reviewCount: 143,
  jobCount: 62,
  replyTimeKey: 'c4_stat_reply_v',
  priceMin: 30,
  priceMax: 50,
  verified: true,
  credentials: [
    { id: 'cin', labelKey: 'c4_verif_cin', status: 'live' },
    { id: 'ae', labelKey: 'c4_verif_ae', status: 'live' },
    { id: 'ref', labelKey: 'c4_verif_ref', status: 'live' },
    { id: 'cnss', labelKey: 'c4_verif_cnss', status: 'live' },
  ],
};

export const quotes: Quote[] = [
  {
    id: 'q1',
    artisanId: 'mohamed-belhaj',
    artisanName: 'Mohamed Belhaj',
    initials: 'MB',
    avatarTint: 'brand',
    price: 35,
    rating: 4.9,
    distanceKm: 1.2,
    noteKey: 'c3_quote1_note',
    timeKey: 'c3_quote1_time',
    highlighted: true,
  },
  {
    id: 'q2',
    artisanId: 'hedi-karray',
    artisanName: 'Hedi Karray',
    initials: 'HK',
    avatarTint: 'amber',
    price: 40,
    rating: 4.7,
    distanceKm: 2.1,
    noteKey: 'c3_quote2_note',
    timeKey: 'c3_quote2_time',
  },
  {
    id: 'q3',
    artisanId: 'walid-trabelsi',
    artisanName: 'Walid Trabelsi',
    initials: 'WT',
    avatarTint: 'blue',
    price: 30,
    rating: 4.6,
    distanceKm: 3.4,
    timeKey: 'c3_quote2_time',
  },
];

export const reviews: Review[] = [{ id: 'r1', author: 'Sarra M.', rating: 5.0, textKey: 'c4_review1' }];

export const workerLeads: WorkerLead[] = [
  {
    id: 'lead1',
    status: 'urgent',
    titleKey: 'w1_job1',
    area: 'Menzah 6',
    distanceKm: 1.2,
    postedKey: 'w1_posted1',
    budgetKey: 'w1_budget1',
    unlockCost: 1,
    unlocked: false,
  },
  {
    id: 'lead2',
    status: 'recurring',
    titleKey: 'w1_job2',
    area: 'Ennasr',
    distanceKm: 2.8,
    postedKey: 'w1_posted2',
    unlockCost: 1,
    unlocked: false,
  },
  {
    id: 'lead3',
    status: 'new',
    titleKey: 'w1_job3',
    area: 'La Marsa',
    distanceKm: 5.1,
    postedKey: 'w1_posted3',
    unlockCost: 1,
    unlocked: false,
  },
];

export const myQuotes: MyQuoteEntry[] = [
  {
    id: 'mq1',
    titleKey: 'w1_job1',
    clientName: 'Sarra M.',
    price: 35,
    status: 'pending',
    sentKey: 'w3_sent1',
  },
  {
    id: 'mq2',
    titleKey: 'w3_job2',
    clientName: 'Ahmed Z.',
    price: 55,
    status: 'pending',
    sentKey: 'w3_sent2',
  },
  {
    id: 'mq3',
    titleKey: 'w3_job3',
    clientName: 'Nadia B.',
    price: 42,
    status: 'accepted',
    sentKey: 'w3_sent3',
    highlighted: true,
  },
];

export const creditPacks: CreditPack[] = [
  { id: 'pack1', nameKey: 'w4_pack1', credits: 10, price: 20, subKey: 'w4_pack1_sub' },
  { id: 'pack2', nameKey: 'w4_pack2', credits: 30, price: 45, subKey: 'w4_pack2_sub', popular: true },
  { id: 'pack3', nameKey: 'w4_pack3', credits: 60, price: 80, subKey: 'w4_pack3_sub' },
];

export const aeJourney: AEStep[] = [
  { id: 'ae1', titleKey: 'w5_step1', subKey: 'w5_step1_s', state: 'done' },
  { id: 'ae2', titleKey: 'w5_step2', subKey: 'w5_step2_s', state: 'done' },
  { id: 'ae3', titleKey: 'w5_step3', subKey: 'w5_step3_s', state: 'now' },
  { id: 'ae4', titleKey: 'w5_step4', subKey: 'w5_step4_s', state: 'upcoming' },
];
