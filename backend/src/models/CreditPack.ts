import { Document, Schema, Types, model } from 'mongoose';

export interface ICreditPack extends Document {
  _id: Types.ObjectId;
  name: { fr: string; ar: string };
  credits: number;
  price: number;
  popular: boolean;
}

const creditPackSchema = new Schema<ICreditPack>({
  name: {
    fr: { type: String, required: true },
    ar: { type: String, required: true },
  },
  credits: { type: Number, required: true },
  price: { type: Number, required: true },
  popular: { type: Boolean, default: false },
});

export const CreditPack = model<ICreditPack>('CreditPack', creditPackSchema);
