import {
  NextFunction,
  Request,
  Response
} from 'express';

export interface ApiHelpers {
  promiseResolver: ((err?: any) => any | void)[]
}

export interface AppRequest extends Request {
  apiHelpers: ApiHelpers;
}

export function appRequestProcessor(req: AppRequest, res: Response, next: NextFunction) {
  req.apiHelpers = {
    promiseResolver: [
      () => res.end(),
      (err: any) => next(err)
    ]
  };

  next();
}