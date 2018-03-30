import express, {
  Request,
  Response
} from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`Hello, now is: ${new Date(Date.now())}`);
});

export const rootRouter = router;