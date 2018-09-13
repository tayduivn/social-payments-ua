import express from 'express';
import { paymentsRouter } from './payments/payments';
import { usersRouter } from './users/users';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/payments', paymentsRouter);

export const apiRouter = router;