import { Schema } from 'mongoose';

const uniqueError = (login: string): Error => new Error(`Login '${login}' already exists`);

const uniqueFieldMongoErrorCode = 11000;

export function addUserModelMiddleware(schema: Schema) {
  schema.post('save', (error: any, model: any, next) => {
    if (error.code === uniqueFieldMongoErrorCode) {
      next(uniqueError(error.getOperation().login));
    } else {
      next(error);
    }
  });

  schema.post('findOneAndUpdate', function (error: any, model: any, next) { // need function's this here, otherwise no _update
    if (error.code === uniqueFieldMongoErrorCode) {
      next(uniqueError(this._update && this._update.login));
    } else {
      next(error);
    }
  });
}
