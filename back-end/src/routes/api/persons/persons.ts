import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Person } from '../../../../../api-contracts/person/person';
import { PersonModel } from '../../../models/person/person.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return PersonModel
    .find()
    .populate('address.street')
    .then(
      (persons: Person[]) => res.send(persons),
      (err) => next(err)
    );
});

export const personsRouter = router;

