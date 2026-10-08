import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAuth, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { purchaseCreditsSchema } from '../utils/schemas';
import { getBalance, listPacks, purchaseCredits } from '../controllers/creditController';

const router = Router();

router.get('/packs', asyncHandler(listPacks));
router.get('/balance', requireAuth, requireRole('worker'), asyncHandler(getBalance));
router.post(
  '/purchase',
  requireAuth,
  requireRole('worker'),
  validate({ body: purchaseCreditsSchema }),
  asyncHandler(purchaseCredits)
);

export default router;
