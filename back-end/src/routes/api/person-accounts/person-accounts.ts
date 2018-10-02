import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { PersonAccounts } from '../../../../../api-contracts/person-accounts/person-accounts';
import { PersonAccountsModel } from '../../../models/person-accounts/person-accounts.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return PersonAccountsModel
    .find()
    .then(
      (personAccounts: PersonAccounts[]) => res.send(personAccounts),
      (err) => next(err)
    );
});

export const personAccountsRouter = router;

