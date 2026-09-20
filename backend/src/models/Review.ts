import { Document, Schema, Types, model } from 'mongoose';

export interface IReview extends Document {
  _id: Types.ObjectId;
  request: Types.ObjectId;
  client: Types.ObjectId;
  artisan: Types.ObjectId;
  rating: number;
  text?: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    request: { type: Schema.Types.ObjectId, ref: 'ServiceRequest', required: true, unique: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    artisan: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

reviewSchema.index({ artisan: 1, createdAt: -1 });

export const Review = model<IReview>('Review', reviewSchema);
