import { Document, Schema, Types, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'client' | 'worker';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  phone?: string;
  language: 'fr' | 'ar';
  city?: string;
  comparePassword(candidate: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['client', 'worker'], required: true },
    phone: { type: String, trim: true },
    language: { type: String, enum: ['fr', 'ar'], default: 'fr' },
    city: { type: String, trim: true },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(candidate: string) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const { passwordHash: _passwordHash, ...rest } = ret as unknown as { passwordHash?: string } & Record<string, unknown>;
    return rest;
  },
});

export const User = model<IUser>('User', userSchema);
