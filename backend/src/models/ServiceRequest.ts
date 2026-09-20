import { Document, Schema, Types, model } from 'mongoose';

export type ServiceRequestStatus = 'open' | 'accepted' | 'completed' | 'cancelled';

export interface IAddress {
  line: string;
  city: string;
  lat?: number;
  lng?: number;
}

export interface IServiceRequest extends Document {
  _id: Types.ObjectId;
  client: Types.ObjectId;
  category: Types.ObjectId;
  description: string;
  photos: string[];
  address: IAddress;
  budgetMin?: number;
  budgetMax?: number;
  status: ServiceRequestStatus;
  unlockedBy: Types.ObjectId[];
  acceptedQuote?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true, trim: true },
    photos: { type: [String], default: [] },
    address: {
      line: { type: String, required: true },
      city: { type: String, required: true },
      lat: Number,
      lng: Number,
    },
    budgetMin: Number,
    budgetMax: Number,
    status: { type: String, enum: ['open', 'accepted', 'completed', 'cancelled'], default: 'open' },
    unlockedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    acceptedQuote: { type: Schema.Types.ObjectId, ref: 'Quote' },
  },
  { timestamps: true }
);

serviceRequestSchema.index({ category: 1, status: 1, createdAt: -1 });

export const ServiceRequest = model<IServiceRequest>('ServiceRequest', serviceRequestSchema);
