import { Request, Response } from 'express';
import { ServiceRequest } from '../models/ServiceRequest';
import { Quote } from '../models/Quote';
import { Review } from '../models/Review';
import { ArtisanProfile } from '../models/ArtisanProfile';
import { ApiError } from '../utils/ApiError';

export async function createRequest(req: Request, res: Response) {
  const { categoryId, description, photos, address, budgetMin, budgetMax } = req.body;

  const serviceRequest = await ServiceRequest.create({
    client: req.user!.id,
    category: categoryId,
    description,
    photos,
    address,
    budgetMin,
    budgetMax,
  });

  res.status(201).json({ request: serviceRequest });
}

export async function listMyRequests(req: Request, res: Response) {
  const requests = await ServiceRequest.find({ client: req.user!.id })
    .sort({ createdAt: -1 })
    .populate('category')
    .populate({ path: 'acceptedQuote', populate: { path: 'artisan', select: 'name' } });
  res.json({ requests });
}

async function canViewRequest(serviceRequest: InstanceType<typeof ServiceRequest>, userId: string, role: string) {
  if (serviceRequest.client.toString() === userId) return true;
  if (role !== 'worker') return false;
  if (serviceRequest.unlockedBy.some((id) => id.toString() === userId)) return true;
  const ownQuote = await Quote.exists({ request: serviceRequest._id, artisan: userId });
  return Boolean(ownQuote);
}

export async function getRequest(req: Request, res: Response) {
  const serviceRequest = await ServiceRequest.findById(req.params.id)
    .populate('category')
    .populate('acceptedQuote');
  if (!serviceRequest) throw ApiError.notFound('Request not found');

  const allowed = await canViewRequest(serviceRequest, req.user!.id, req.user!.role);
  if (!allowed) throw ApiError.forbidden('You do not have access to this request');

  res.json({ request: serviceRequest });
}

export async function listQuotesForRequest(req: Request, res: Response) {
  const serviceRequest = await ServiceRequest.findById(req.params.id);
  if (!serviceRequest) throw ApiError.notFound('Request not found');
  if (serviceRequest.client.toString() !== req.user!.id) {
    throw ApiError.forbidden('Only the request owner can view its quotes');
  }

  const quotes = await Quote.find({ request: serviceRequest._id })
    .sort({ createdAt: 1 })
    .populate('artisan', 'name');

  const artisanIds = quotes.map((q) => q.artisan._id);
  const profiles = await ArtisanProfile.find({ user: { $in: artisanIds } });
  const profileByArtisan = new Map(profiles.map((p) => [p.user.toString(), p]));

  const enriched = quotes.map((q) => ({
    quote: q,
    artisanProfile: profileByArtisan.get(q.artisan._id.toString()) ?? null,
  }));

  res.json({ quotes: enriched });
}

export async function acceptQuote(req: Request, res: Response) {
  const { id, quoteId } = req.params;

  const serviceRequest = await ServiceRequest.findById(id);
  if (!serviceRequest) throw ApiError.notFound('Request not found');
  if (serviceRequest.client.toString() !== req.user!.id) {
    throw ApiError.forbidden('Only the request owner can accept a quote');
  }
  if (serviceRequest.status !== 'open') {
    throw ApiError.conflict('This request is no longer open');
  }

  const quote = await Quote.findOne({ _id: quoteId, request: id });
  if (!quote) throw ApiError.notFound('Quote not found');

  quote.status = 'accepted';
  await quote.save();
  await Quote.updateMany({ request: id, _id: { $ne: quote._id } }, { status: 'declined' });

  serviceRequest.status = 'accepted';
  serviceRequest.acceptedQuote = quote._id;
  await serviceRequest.save();

  res.json({ request: serviceRequest, quote });
}

export async function completeRequest(req: Request, res: Response) {
  const serviceRequest = await ServiceRequest.findById(req.params.id);
  if (!serviceRequest) throw ApiError.notFound('Request not found');
  if (serviceRequest.client.toString() !== req.user!.id) {
    throw ApiError.forbidden('Only the request owner can complete this request');
  }
  if (serviceRequest.status !== 'accepted') {
    throw ApiError.conflict('Only an accepted request can be marked complete');
  }

  serviceRequest.status = 'completed';
  await serviceRequest.save();

  res.json({ request: serviceRequest });
}

export async function createReview(req: Request, res: Response) {
  const { rating, text } = req.body;
  const serviceRequest = await ServiceRequest.findById(req.params.id).populate('acceptedQuote');
  if (!serviceRequest) throw ApiError.notFound('Request not found');
  if (serviceRequest.client.toString() !== req.user!.id) {
    throw ApiError.forbidden('Only the request owner can review this request');
  }
  if (serviceRequest.status !== 'completed') {
    throw ApiError.conflict('Only a completed request can be reviewed');
  }
  const acceptedQuote = serviceRequest.acceptedQuote as unknown as InstanceType<typeof Quote> | undefined;
  if (!acceptedQuote) throw ApiError.conflict('This request has no accepted quote to review');

  const existing = await Review.findOne({ request: serviceRequest._id });
  if (existing) throw ApiError.conflict('This request has already been reviewed');

  const review = await Review.create({
    request: serviceRequest._id,
    client: req.user!.id,
    artisan: acceptedQuote.artisan,
    rating,
    text,
  });

  await ArtisanProfile.updateOne(
    { user: acceptedQuote.artisan },
    { $inc: { ratingSum: rating, ratingCount: 1, jobCount: 1 } }
  );

  res.status(201).json({ review });
}
