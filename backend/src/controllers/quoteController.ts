import { Request, Response } from 'express';
import { ServiceRequest } from '../models/ServiceRequest';
import { Quote } from '../models/Quote';
import { ApiError } from '../utils/ApiError';

export async function submitQuote(req: Request, res: Response) {
  const { price, timeSlot, message } = req.body;
  const serviceRequest = await ServiceRequest.findById(req.params.id);
  if (!serviceRequest) throw ApiError.notFound('Request not found');
  if (serviceRequest.status !== 'open') {
    throw ApiError.conflict('This request is no longer accepting quotes');
  }

  const hasUnlocked = serviceRequest.unlockedBy.some((id) => id.toString() === req.user!.id);
  if (!hasUnlocked) {
    throw ApiError.forbidden('Unlock this request before sending a quote');
  }

  const existing = await Quote.findOne({ request: serviceRequest._id, artisan: req.user!.id });
  if (existing) throw ApiError.conflict('You already sent a quote for this request');

  const quote = await Quote.create({
    request: serviceRequest._id,
    artisan: req.user!.id,
    price,
    timeSlot,
    message,
  });

  res.status(201).json({ quote });
}

export async function listMyQuotes(req: Request, res: Response) {
  const quotes = await Quote.find({ artisan: req.user!.id })
    .sort({ createdAt: -1 })
    .populate({
      path: 'request',
      select: 'description status client category',
      populate: [
        { path: 'client', select: 'name' },
        { path: 'category', select: 'name icon tint' },
      ],
    });

  res.json({ quotes });
}
