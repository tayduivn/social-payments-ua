import express from 'express';
import { periodRouter } from './period/period';

const router = express.Router();

router.use('/period', periodRouter);

export const reportsRouter = router;