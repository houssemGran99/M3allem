import { Router } from 'express';
import authRoutes from './authRoutes';
import categoryRoutes from './categoryRoutes';
import artisanRoutes from './artisanRoutes';
import requestRoutes from './requestRoutes';
import quoteRoutes from './quoteRoutes';
import leadRoutes from './leadRoutes';
import creditRoutes from './creditRoutes';
import aeJourneyRoutes from './aeJourneyRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/artisans', artisanRoutes);
router.use('/requests', requestRoutes);
router.use('/quotes', quoteRoutes);
router.use('/leads', leadRoutes);
router.use('/credits', creditRoutes);
router.use('/ae-journey', aeJourneyRoutes);

export default router;
