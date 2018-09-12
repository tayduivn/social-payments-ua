import express  from 'express';
import { usersRouter } from './users/users';

const router = express.Router();

router.use('/users', usersRouter);

export const apiRouter = router;