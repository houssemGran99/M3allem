import { Request, Response } from 'express';
import { User } from '../models/User';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { Review } from '../models/Review';
import { ApiError } from '../utils/ApiError';

export async function getArtisanProfile(req: Request, res: Response) {
  const { id } = req.params;

  const user = await User.findOne({ _id: id, role: 'worker' });
  if (!user) throw ApiError.notFound('Artisan not found');

  const profile = await ArtisanProfile.findOne({ user: user._id }).populate('categories');
  if (!profile) throw ApiError.notFound('Artisan profile not found');

  const reviews = await Review.find({ artisan: user._id })
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('client', 'name');

  res.json({ user, profile, reviews });
}
