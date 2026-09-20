import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { requireAuth, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createRequestSchema,
  createReviewSchema,
  idParamSchema,
  requestQuoteParamSchema,
} from '../utils/schemas';
import {
  acceptQuote,
  completeRequest,
  createRequest,
  createReview,
  getRequest,
  listMyRequests,
  listQuotesForRequest,
} from '../controllers/requestController';
import { submitQuote } from '../controllers/quoteController';

const router = Router();

router.use(requireAuth);

router.post('/', requireRole('client'), validate({ body: createRequestSchema }), asyncHandler(createRequest));
router.get('/mine', requireRole('client'), asyncHandler(listMyRequests));
router.get('/:id', validate({ params: idParamSchema }), asyncHandler(getRequest));

router.get(
  '/:id/quotes',
  requireRole('client'),
  validate({ params: idParamSchema }),
  asyncHandler(listQuotesForRequest)
);
router.post(
  '/:id/quotes',
  requireRole('worker'),
  validate({ params: idParamSchema }),
  asyncHandler(submitQuote)
);
router.patch(
  '/:id/quotes/:quoteId/accept',
  requireRole('client'),
  validate({ params: requestQuoteParamSchema }),
  asyncHandler(acceptQuote)
);

router.post('/:id/complete', requireRole('client'), validate({ params: idParamSchema }), asyncHandler(completeRequest));
router.post(
  '/:id/review',
  requireRole('client'),
  validate({ params: idParamSchema, body: createReviewSchema }),
  asyncHandler(createReview)
);

export default router;
