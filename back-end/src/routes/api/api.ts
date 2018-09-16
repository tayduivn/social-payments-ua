import express from 'express';
import { financialInstitutionsRouter } from './financial-institutions/financial-institutions';
import { paymentsRouter } from './payments/payments';
import { personAccountsRouter } from './person-accounts/person-accounts';
import { personsRouter } from './persons/persons';
import { usersRouter } from './users/users';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/payments', paymentsRouter);
router.use('/financial-institutions', financialInstitutionsRouter);
router.use('/persons', personsRouter);
router.use('/person-accounts', personAccountsRouter);

export const apiRouter = router;