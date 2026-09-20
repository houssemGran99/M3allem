import { Router } from 'express';
import { listCategories } from '../controllers/categoryController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(listCategories));

export default router;
