import { Request, Response } from 'express';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { CreditPack } from '../models/CreditPack';
import { CreditTransaction } from '../models/CreditTransaction';
import { ApiError } from '../utils/ApiError';

export async function getBalance(req: Request, res: Response) {
  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');
  res.json({ creditBalance: profile.creditBalance });
}

export async function listPacks(_req: Request, res: Response) {
  const packs = await CreditPack.find().sort({ credits: 1 });
  res.json({ packs });
}

export async function purchaseCredits(req: Request, res: Response) {
  const { packId } = req.body;

  const pack = await CreditPack.findById(packId);
  if (!pack) throw ApiError.notFound('Credit pack not found');

  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');

  // In production this would run after a real payment provider (Flouci/D17) confirms
  // the charge; for this MVP the purchase is credited immediately.
  profile.creditBalance += pack.credits;
  await profile.save();

  await CreditTransaction.create({
    artisan: req.user!.id,
    type: 'purchase',
    amount: pack.credits,
    relatedPack: pack._id,
  });

  res.status(201).json({ creditBalance: profile.creditBalance });
}
