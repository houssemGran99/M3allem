import { Document, Schema, Types, model } from 'mongoose';

export interface ICategory extends Document {
  _id: Types.ObjectId;
  slug: string;
  name: { fr: string; ar: string };
  icon: string;
  tint: 'blue' | 'amber' | 'brand' | 'sub';
}

const categorySchema = new Schema<ICategory>({
  slug: { type: String, required: true, unique: true },
  name: {
    fr: { type: String, required: true },
    ar: { type: String, required: true },
  },
  icon: { type: String, required: true },
  tint: { type: String, enum: ['blue', 'amber', 'brand', 'sub'], default: 'sub' },
});

export const Category = model<ICategory>('Category', categorySchema);
