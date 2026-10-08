import { Document, Schema, Types, model } from 'mongoose';

export type CreditTransactionType = 'purchase' | 'spend' | 'referral_bonus';

export interface ICreditTransaction extends Document {
  _id: Types.ObjectId;
  artisan: Types.ObjectId;
  type: CreditTransactionType;
  amount: number;
  relatedRequest?: Types.ObjectId;
  relatedPack?: Types.ObjectId;
  createdAt: Date;
}

const creditTransactionSchema = new Schema<ICreditTransaction>(
  {
    artisan: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['purchase', 'spend', 'referral_bonus'], required: true },
    amount: { type: Number, required: true },
    relatedRequest: { type: Schema.Types.ObjectId, ref: 'ServiceRequest' },
    relatedPack: { type: Schema.Types.ObjectId, ref: 'CreditPack' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const CreditTransaction = model<ICreditTransaction>('CreditTransaction', creditTransactionSchema);
