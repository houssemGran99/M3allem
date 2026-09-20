import { Router } from 'express';
import { getArtisanProfile } from '../controllers/artisanController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { idParamSchema } from '../utils/schemas';

const router = Router();

router.get('/:id', validate({ params: idParamSchema }), asyncHandler(getArtisanProfile));

export default router;
