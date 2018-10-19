import {
  NextFunction,
  Response
} from 'express';

export class ApiCommonController {
  protected static promiseResponse<T>(res: Response, next: NextFunction): [(val: T) => void, (err: any) => void] {
    return [
      ApiCommonController.promiseResponseHandler<T>(res),
      ApiCommonController.promiseErrorHandler(next)
    ];
  }

  protected static promiseEnd(res: Response, next: NextFunction): [() => void, (err: any) => void] {
    return [
      ApiCommonController.promiseEndHandler(res),
      ApiCommonController.promiseErrorHandler(next)
    ];
  }

  private static promiseEndHandler(res: Response) {
    return () => res.end();
  }

  private static promiseResponseHandler<T>(res: Response) {
    return (val: T) => res.send(val);
  }

  private static promiseErrorHandler(next: NextFunction) {
    return (err: any) => next(err);
  }
}
