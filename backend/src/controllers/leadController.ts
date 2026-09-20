import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ServiceRequest, IServiceRequest } from '../models/ServiceRequest';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { CreditTransaction } from '../models/CreditTransaction';
import { ApiError } from '../utils/ApiError';

const UNLOCK_COST = 1;

function redact(serviceRequest: IServiceRequest, unlocked: boolean) {
  const base = {
    _id: serviceRequest._id,
    category: serviceRequest.category,
    status: serviceRequest.status,
    budgetMin: serviceRequest.budgetMin,
    budgetMax: serviceRequest.budgetMax,
    city: serviceRequest.address.city,
    createdAt: serviceRequest.createdAt,
    unlocked,
  };

  if (!unlocked) {
    return base;
  }

  return {
    ...base,
    description: serviceRequest.description,
    photos: serviceRequest.photos,
    address: serviceRequest.address,
    client: serviceRequest.client,
  };
}

export async function listLeads(req: Request, res: Response) {
  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');

  const filter: Record<string, unknown> = { status: 'open' };
  if (profile.categories.length > 0) {
    filter.category = { $in: profile.categories };
  }

  const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 }).populate('category');

  const leads = requests.map((r) => {
    const unlocked = r.unlockedBy.some((id) => id.toString() === req.user!.id);
    return redact(r, unlocked);
  });

  res.json({ leads, unlockCost: UNLOCK_COST, creditBalance: profile.creditBalance });
}

export async function unlockLead(req: Request, res: Response) {
  const serviceRequest = await ServiceRequest.findById(req.params.id).populate('category').populate('client', 'name phone');
  if (!serviceRequest) throw ApiError.notFound('Request not found');

  const alreadyUnlocked = serviceRequest.unlockedBy.some((id) => id.toString() === req.user!.id);
  if (alreadyUnlocked) {
    res.json({ request: redact(serviceRequest, true), creditBalance: (await ArtisanProfile.findOne({ user: req.user!.id }))?.creditBalance });
    return;
  }

  const profile = await ArtisanProfile.findOne({ user: req.user!.id });
  if (!profile) throw ApiError.notFound('Artisan profile not found');
  if (profile.creditBalance < UNLOCK_COST) {
    throw new ApiError(402, 'Insufficient credits');
  }

  profile.creditBalance -= UNLOCK_COST;
  await profile.save();

  await CreditTransaction.create({
    artisan: req.user!.id,
    type: 'spend',
    amount: -UNLOCK_COST,
    relatedRequest: serviceRequest._id,
  });

  serviceRequest.unlockedBy.push(new Types.ObjectId(req.user!.id));
  await serviceRequest.save();

  res.json({ request: redact(serviceRequest, true), creditBalance: profile.creditBalance });
}
