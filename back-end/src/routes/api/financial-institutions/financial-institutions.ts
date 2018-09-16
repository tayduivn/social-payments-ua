import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { FinancialInstitution } from '../../../../../api-contracts/financial-institution/financial.institution';
import { FinancialInstitutionModel } from '../../../models/financial-institution/financial-institution.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return FinancialInstitutionModel
    .find()
    .then(
      (payments: FinancialInstitution[]) => res.send(payments),
      (err) => next(err)
    );
});

export const financialInstitutionsRouter = router;
