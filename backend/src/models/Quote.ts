import { Document, Schema, Types, model } from 'mongoose';

export type QuoteStatus = 'pending' | 'accepted' | 'declined';

export interface IQuote extends Document {
  _id: Types.ObjectId;
  request: Types.ObjectId;
  artisan: Types.ObjectId;
  price: number;
  timeSlot: string;
  message?: string;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<IQuote>(
  {
    request: { type: Schema.Types.ObjectId, ref: 'ServiceRequest', required: true },
    artisan: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true, min: 0 },
    timeSlot: { type: String, required: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  },
  { timestamps: true }
);

quoteSchema.index({ request: 1, artisan: 1 }, { unique: true });

export const Quote = model<IQuote>('Quote', quoteSchema);
