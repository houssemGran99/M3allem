import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAuth, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { idParamSchema } from '../utils/schemas';
import { listLeads, unlockLead } from '../controllers/leadController';

const router = Router();

router.use(requireAuth, requireRole('worker'));

router.get('/', asyncHandler(listLeads));
router.post('/:id/unlock', validate({ params: idParamSchema }), asyncHandler(unlockLead));

export default router;
