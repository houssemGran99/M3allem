export type TradeCategory = {
  id: string;
  name: string;
  proCount: number;
  icon: string;
  tint: 'blue' | 'amber' | 'brand' | 'sub';
};

export type Credential = {
  id: string;
  label: string;
  detail: string;
  status: 'live' | 'renew';
};

export type Professional = {
  id: string;
  name: string;
  initials: string;
  avatarTint: 'brand' | 'amber' | 'blue';
  trade: string;
  rating: number;
  reviewCount: number;
  distanceMiles: number;
  price: number;
  verified: boolean;
  badges: string[];
  availability: string;
  availabilityUrgent?: boolean;
  yearsExperience?: number;
  completedPct?: number;
  replyTime?: string;
  credentials?: Credential[];
  ratingBreakdown?: { stars: number; pct: number }[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type BookedJob = {
  id: string;
  proId: string;
  title: string;
  description: string;
  date: string;
  arrivalWindow: string;
  price: number;
  bookingFee: number;
};

export type WorkerJob = {
  id: string;
  clientInitials: string;
  clientTint: 'brand' | 'amber' | 'blue';
  clientName: string;
  clientRating: number;
  title: string;
  description: string;
  status: 'urgent' | 'recurring' | 'scheduled';
  area: string;
  distanceMiles: number;
  duration: string;
  payout: number;
  jobTotal: number;
  feePct: number;
  address: string;
  parking: string;
  arrival: string;
  jobsBooked?: number;
};

export type DiaryEntry = {
  id: string;
  day: string;
  time: string;
  meridiem: string;
  title: string;
  area: string;
  clientName: string;
  price: number;
  recurring?: boolean;
  accent: 'amber' | 'blue' | 'brand';
};

export type EarningsEntry = {
  id: string;
  clientInitials: string;
  clientTint: 'brand' | 'amber' | 'blue';
  title: string;
  date: string;
  duration: string;
  clientName: string;
  amount: number;
};
