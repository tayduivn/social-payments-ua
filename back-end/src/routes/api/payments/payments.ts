import express from 'express';
import { PaymentsController } from './payments.controller';

const router = express.Router();

router.get('/', PaymentsController.getByFilter);
router.post('/', PaymentsController.create);
router.get('/latest', PaymentsController.getLatest);
router.get('/:id', PaymentsController.getPayment);

export const paymentsRouter = router;
