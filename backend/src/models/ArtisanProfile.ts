import { Document, Schema, Types, model } from 'mongoose';

export type CredentialType = 'cin' | 'ae' | 'referral' | 'cnss';
export type CredentialStatus = 'live' | 'pending';

export interface ICredential {
  type: CredentialType;
  label: { fr: string; ar: string };
  status: CredentialStatus;
}

export type AEStepState = 'done' | 'now' | 'upcoming';

export interface IAEStep {
  key: string;
  title: { fr: string; ar: string };
  sub: { fr: string; ar: string };
  state: AEStepState;
}

export interface IArtisanProfile extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  roleLabel: { fr: string; ar: string };
  categories: Types.ObjectId[];
  area: string;
  priceMin: number;
  priceMax: number;
  verified: boolean;
  credentials: ICredential[];
  ratingSum: number;
  ratingCount: number;
  jobCount: number;
  completionPct: number;
  onTimePct: number;
  replyTimeMinutes: number;
  creditBalance: number;
  aeJourney: IAEStep[];
  createdAt: Date;
  updatedAt: Date;
}

const bilingual = { fr: { type: String, required: true }, ar: { type: String, required: true } };

const credentialSchema = new Schema<ICredential>(
  {
    type: { type: String, enum: ['cin', 'ae', 'referral', 'cnss'], required: true },
    label: bilingual,
    status: { type: String, enum: ['live', 'pending'], default: 'live' },
  },
  { _id: false }
);

const aeStepSchema = new Schema<IAEStep>(
  {
    key: { type: String, required: true },
    title: bilingual,
    sub: bilingual,
    state: { type: String, enum: ['done', 'now', 'upcoming'], default: 'upcoming' },
  },
  { _id: false }
);

const artisanProfileSchema = new Schema<IArtisanProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    roleLabel: bilingual,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    area: { type: String, required: true },
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    credentials: { type: [credentialSchema], default: [] },
    ratingSum: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    jobCount: { type: Number, default: 0 },
    completionPct: { type: Number, default: 100 },
    onTimePct: { type: Number, default: 100 },
    replyTimeMinutes: { type: Number, default: 60 },
    creditBalance: { type: Number, default: 0 },
    aeJourney: { type: [aeStepSchema], default: [] },
  },
  { timestamps: true }
);

artisanProfileSchema.virtual('rating').get(function (this: IArtisanProfile) {
  return this.ratingCount === 0 ? 0 : Number((this.ratingSum / this.ratingCount).toFixed(1));
});

artisanProfileSchema.set('toJSON', { virtuals: true });

export const ArtisanProfile = model<IArtisanProfile>('ArtisanProfile', artisanProfileSchema);
