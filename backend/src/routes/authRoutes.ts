import { Router } from 'express';
import { login, me, register } from '../controllers/authController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { loginSchema, registerSchema } from '../utils/schemas';

const router = Router();

router.post('/register', validate({ body: registerSchema }), asyncHandler(register));
router.post('/login', validate({ body: loginSchema }), asyncHandler(login));
router.get('/me', requireAuth, asyncHandler(me));

export default router;
