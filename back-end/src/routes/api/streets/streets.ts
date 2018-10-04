import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Street } from '../../../../../api-contracts/street/street';
import { StreetModel } from '../../../models/street/street.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return StreetModel
    .find()
    .then(
      (streets: Street[]) => res.send(streets),
      (err) => next(err)
    );
});

export const streetsRouter = router;


