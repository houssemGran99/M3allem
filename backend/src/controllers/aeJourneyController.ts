import { Request, Response } from 'express';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { ApiError } from '../utils/ApiError';

export async function getJourney(req: Request, res: Response) {
  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');
  res.json({ aeJourney: profile.aeJourney });
}

export async function advanceJourney(req: Request, res: Response) {
  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');

  const currentIndex = profile.aeJourney.findIndex((step) => step.state === 'now');
  if (currentIndex === -1) {
    throw ApiError.conflict('There is no in-progress step to advance');
  }

  profile.aeJourney[currentIndex].state = 'done';
  if (currentIndex + 1 < profile.aeJourney.length) {
    profile.aeJourney[currentIndex + 1].state = 'now';
  }

  await profile.save();
  res.json({ aeJourney: profile.aeJourney });
}
