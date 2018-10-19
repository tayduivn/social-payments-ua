import express from 'express';
import { PaymentsController } from './payments.controller';

const router = express.Router();

router.get('/', PaymentsController.getByFilter);
router.post('/', PaymentsController.create);

export const paymentsRouter = router;