import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAuth, requireRole } from '../middleware/auth';
import { advanceJourney, getJourney } from '../controllers/aeJourneyController';

const router = Router();

router.use(requireAuth, requireRole('worker'));

router.get('/', asyncHandler(getJourney));
router.post('/advance', asyncHandler(advanceJourney));

export default router;
