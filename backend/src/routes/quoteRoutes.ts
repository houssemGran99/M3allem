import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAuth, requireRole } from '../middleware/auth';
import { listMyQuotes } from '../controllers/quoteController';

const router = Router();

router.get('/mine', requireAuth, requireRole('worker'), asyncHandler(listMyQuotes));

export default router;
