import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { ApiError } from '../utils/ApiError';
import { signToken } from '../utils/jwt';
import { defaultAEJourney } from '../utils/defaults';

export async function register(req: Request, res: Response) {
  const { name, email, password, role, phone, city, language, artisan } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict('An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role, phone, city, language });

  if (role === 'worker') {
    await ArtisanProfile.create({
      user: user._id,
      roleLabel: artisan?.roleLabel ?? { fr: 'Artisan', ar: 'صنايعي' },
      area: artisan?.area ?? city ?? 'Tunis',
      priceMin: artisan?.priceMin ?? 20,
      priceMax: artisan?.priceMax ?? 50,
      categories: artisan?.categoryIds ?? [],
      credentials: [],
      aeJourney: defaultAEJourney(),
      creditBalance: 0,
    });
  }

  const token = signToken({ sub: user._id.toString(), role: user.role });
  res.status(201).json({ token, user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  const token = signToken({ sub: user._id.toString(), role: user.role });
  res.json({ token, user });
}

export async function me(req: Request, res: Response) {
  const user = await User.findById(req.user!.id);
  if (!user) throw ApiError.notFound('User not found');

  if (user.role === 'worker') {
    const profile = await ArtisanProfile.findOne({ user: user._id }).populate('categories');
    res.json({ user, artisanProfile: profile });
    return;
  }

  res.json({ user });
}
