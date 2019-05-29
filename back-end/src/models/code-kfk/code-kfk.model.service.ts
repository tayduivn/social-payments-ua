import { MongoosePromise } from '../mongoose-promise';
import { CodeKFKModel } from './code-kfk.model';
import { uniqueFieldMongoErrorCode } from '../unique-field-error-code.const';

export class CodeKFKModelService {
  public static add(code: string): MongoosePromise<void> {
    return CodeKFKModel.create({code})
      .then(() => {})
      .catch((err) => {
        if (err && err.code === uniqueFieldMongoErrorCode) {
          return;
        } else {
          throw err;
        }
      });
  }

  public static getAll(): MongoosePromise<CodeKFKModel[]> {
    return CodeKFKModel
      .find()
      .sort('code')
  }
}
